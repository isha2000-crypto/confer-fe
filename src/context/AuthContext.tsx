// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'
import Cookies from 'js-cookie'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'
import { useMutation } from '@apollo/client'
import LOGIN_USER_MUTATION from '../lib/graphql/Mutation/index'
import { VALIDATE_USERS } from '../lib/graphql/Query/index'

// ** Types
import { AuthValuesType, RegisterParams, LoginParams, ErrCallbackType, UserDataType } from '@custom-types/contextTypes'
import client from 'src/lib/apollo/client'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const authInit = async (): Promise<void> => {
      const storedToken = Cookies.get('access_token')
      if (storedToken) {
        setLoading(true)
        try {
          const { data } = await validateUserQuery()
          setLoading(false)
          setUser({ ...data.validateToken })
        } catch (error) {
          Cookies.remove('access_token')
          setUser(null)
          if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
            router.replace('/login')
          }
        }
      } else {
        setLoading(false)
      }
    }

    const validateUserQuery = async () => {
      return await client.query({
        query: VALIDATE_USERS,
        fetchPolicy: 'network-only',
        context: {
          headers: {
            Authorization: `Bearer ${Cookies.get('access_token')}`
          }
        }
      })
    }

    authInit()
    console.log('Auth complete')

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const [loginUserMutation] = useMutation(LOGIN_USER_MUTATION)

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    loginUserMutation({
      variables: {
        email: params.email,
        password: params.password
      }
    })
      .then(response => {
        Cookies.set('access_token', response.data.loginUser.access_token)
        const returnUrl = router.query.returnUrl
        setUser({ ...response.data.loginUser.user })
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
        router.replace(redirectURL as string)
      })
      .catch(err => {
        console.log('Error', err)
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    Cookies.remove('access_token')
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const handleRegister = (params: RegisterParams, errorCallback?: ErrCallbackType) => {
    axios
      .post(authConfig.registerEndpoint, params)
      .then(res => {
        if (res.data.error) {
          if (errorCallback) errorCallback(res.data.error)
        } else {
          handleLogin({ email: params.email, password: params.password })
        }
      })
      .catch((err: { [key: string]: string }) => (errorCallback ? errorCallback(err) : null))
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
