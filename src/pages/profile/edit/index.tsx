import React from 'react'
import { useAuth } from 'src/hooks/useAuth'

const Profile = () => {
  const auth = useAuth()
  console.log('cureent logged in user name', auth.user?.name)

  return <div>hey i am </div>
}
export default Profile
