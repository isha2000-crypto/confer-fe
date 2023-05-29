// ** MUI Imports
import UserDetails from '@components/organisms/User/UserDetails'
import { ACTIONS, SUBJECTS } from '@custom-types/enum'
import FallbackSpinner from 'src/@core/components/spinner'
import { useAuth } from 'src/hooks/useAuth'

const UserViewLeft = () => {
  const auth = useAuth()
  if (auth.loading) {
    return <FallbackSpinner />
  }

  return auth.user && <UserDetails user={auth.user} />
}

UserViewLeft.acl = {
  action: ACTIONS.READ,
  subject: SUBJECTS.USERS
}

export default UserViewLeft
