import React from 'react'

// ** MUI Imports
import { useRouter } from 'next/router'
import { useLazyQuery } from '@apollo/client'
import { FETCH_USER_BY_ID } from 'src/lib/graphql/Query'
import Spinner from 'src/@core/components/spinner'
import { ACTIONS, SUBJECTS } from '@custom-types/enum'
import UserDetails from '@components/organisms/User/UserDetails'

const UserDetailsView = () => {
  const router = useRouter()
  const { userId } = router.query
  const [userData, setUserData] = React.useState<any>(null)

  const [getUser, { loading: userLoading, error: userError }] = useLazyQuery(FETCH_USER_BY_ID, {
    onCompleted: data => {
      setUserData(data.user)
    }
  })

  React.useEffect(() => {
    getUser({ variables: { userId: userId } })
  }, [getUser, userId])

  if (userLoading) return <Spinner />

  if (userError) return <div>Error</div>

  return (
    userData && (
      <UserDetails
        user={userData}
        assessmentsCount={userData.assessments.length}
        submissionCount={userData.submittedAssessments.length}
      />
    )
  )
}
UserDetailsView.acl = {
  action: ACTIONS.READ,
  subject: SUBJECTS.USERS_MANAGEMENT
}

export default UserDetailsView
