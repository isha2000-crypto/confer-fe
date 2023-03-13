// ** React Imports
import { useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'

// ** Hook Imports
import { useAuth } from 'src/hooks/useAuth'
import { Roles } from '../custom-types/enum'
import { ASSESSMENT_URL } from '@custom-types/constants'

/**
 *  Set Home URL based on User Roles
 */
export const getHomeRoute = (role: string) => {
  if (Roles.ADMIN === role) return '/home'
  if (Roles.USER === role) {
    return ASSESSMENT_URL
  }

  return '/login'
}

const Home = () => {
  // ** Hooks
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    if (auth.user && auth.user.role) {
      const homeRoute = getHomeRoute(auth.user.role)

      // Redirect user to Home URL
      router.replace(homeRoute)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth])

  return <Spinner />
}

export default Home
