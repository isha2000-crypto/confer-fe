// ** React Imports
import { useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Hook Imports
import { useAuth } from 'src/hooks/useAuth'
import { Role } from '@custom-types/contextTypes'
import FallbackSpinner from 'src/@core/components/spinner'

/**
 *  Set Home URL based on User Roles
 */
export const getHomeRoute = (role: Role) => {
  if (Object.keys(role).length !== 0) {
    return '/home'
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

  return <FallbackSpinner />
}

export default Home
