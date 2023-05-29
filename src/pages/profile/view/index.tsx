// ** MUI Imports
import { useLazyQuery } from '@apollo/client'
import UserDetails from '@components/organisms/User/UserDetails'
import { ACTIONS, SUBJECTS } from '@custom-types/enum'
import React from 'react'
import Spinner from 'src/@core/components/spinner'
import FallbackSpinner from 'src/@core/components/spinner'
import { useAuth } from 'src/hooks/useAuth'
import { FETCH_USER_BY_ID } from 'src/lib/graphql/Query'

const UserViewLeft = () => {
  const auth = useAuth()

  const [userData, setUserData] = React.useState<any>(null)

  const [getUser, { loading: userLoading, error: userError }] = useLazyQuery(FETCH_USER_BY_ID, {
    onCompleted: data => {
      setUserData(data.user)
    }
  })

  React.useEffect(() => {
    if (auth.user) {
      getUser({ variables: { userId: auth.user.id } })
    }
  }, [auth, getUser])

  if (auth.loading) {
    return <FallbackSpinner />
  }

  if (userLoading) return <Spinner />

  if (userError) return <div>Error</div>

  return (
    userData && (
      <UserDetails
        user={userData}
        assessmentsCount={userData.assessments.lenght}
        submissionCount={userData.submittedAssessments.length}
      />
    )
  )
}

UserViewLeft.acl = {
  action: ACTIONS.READ,
  subject: SUBJECTS.USERS
}

export default UserViewLeft
