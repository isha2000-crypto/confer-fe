// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'
import Cookies from 'js-cookie'

// ** Next Import
import { useRouter } from 'next/router'

// ** Config
import authConfig from 'src/configs/auth'
import { useMutation } from '@apollo/client'

import { SIGNUP_USER_MUTATION } from '../lib/graphql/Mutation/index'
import { LOGIN_USER_MUTATION } from '../lib/graphql/Mutation/index'
import { LOGIN_GOOGLE_MUTATION } from '../lib/graphql/Mutation/index'
import { VALIDATE_USERS } from '../lib/graphql/Query/index'

// ** Types
import { AuthValuesType, RegisterParams, LoginParams, ErrCallbackType, UserDataType } from '@custom-types/contextTypes'
import client from 'src/lib/apollo/client'
import { ACCESS_TOKEN } from '@custom-types/constants'
import { CodeResponse } from '@react-oauth/google'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  loginGoogle: () => Promise.resolve(),
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
      const storedToken = Cookies.get(ACCESS_TOKEN)
      if (storedToken) {
        setLoading(true)
        try {
          const { data } = await validateUserQuery()
          setUser({ ...data.validateToken, id: data.validateToken._id })
        } catch (error) {
          Cookies.remove(ACCESS_TOKEN)
          setUser(null)
          if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
            router.replace('/login')
          }
        }
        setLoading(false)
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
            Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN)}`
          }
        }
      })
    }

    authInit()

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
        Cookies.set(ACCESS_TOKEN, response.data.loginUser.access_token)
        const returnUrl = router.query.returnUrl
        const userData = response.data.loginUser.user
        setUser({ ...userData, id: userData._id })
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
    Cookies.remove(ACCESS_TOKEN)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }
  const [signupUserMutation] = useMutation(SIGNUP_USER_MUTATION)

  const handleRegister = (params: RegisterParams) => {
    router.push('/login')
    signupUserMutation({
      variables: {
        name: params.name,
        email: params.email,
        password: params.password
      }
    })
  }

  const [loginGoogleMutation] = useMutation(LOGIN_GOOGLE_MUTATION)

  const handleGoogleLogin = (params: CodeResponse, errorCallback?: ErrCallbackType) => {
    loginGoogleMutation({
      variables: {
        ...params
      }
    })
      .then(response => {
        Cookies.set(ACCESS_TOKEN, response.data.loginGoogle.access_token)
        const returnUrl = router.query.returnUrl
        const userData = response.data.loginGoogle.user
        setUser({ ...userData, id: userData._id })
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
        router.replace(redirectURL as string)
      })
      .catch(err => {
        console.log('Error in LoginGoogle', err)
        if (errorCallback) errorCallback(err)
      })
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    loginGoogle: handleGoogleLogin,
    logout: handleLogout,
    register: handleRegister
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
