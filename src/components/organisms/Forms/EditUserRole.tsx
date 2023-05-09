import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import { FormControl } from '@mui/material'
import { UsersType } from '@custom-types/user-type'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { useMutation } from '@apollo/client'
import { UPDATE_USER } from 'src/lib/graphql/Mutation'
import { useDispatch } from 'react-redux'
import { fetchUsers } from 'src/store/users/usersActions'
import ActionButtons from '@components/molecules/Actions/ActionButtons'

const Form = styled('form')(({ theme }) => ({
  padding: theme.spacing(12)
}))

const EditUserRole = ({
  loading,
  handleClose,
  user
}: {
  loading: boolean
  handleClose: () => void
  user: UsersType
}) => {
  const [userRole, setUserRole] = useState(String(user.roleId))
  const rolesState = useSelector((store: RootState) => store.roles)
  const dispatch = useDispatch<AppDispatch>()
  const [updateUser] = useMutation(UPDATE_USER)
  const handleSubmit = (event: any) => {
    event.preventDefault()
  }

  const handleRoleChange = (event: any) => {
    setUserRole(event.target.value)
  }
  const update = () => {
    const updatedUser = {
      roleId: userRole
    }
    updateUser({
      variables: { updateUserInput: { ...updatedUser }, updateUserId: user._id }
    }).then(result => {
      handleClose()
      dispatch(fetchUsers())
      console.log(result.data)
    })
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <TextField fullWidth label='Email' disabled value={user.email} />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth sx={{ alignSelf: 'center' }}>
              <InputLabel id='role-select-label'>Role</InputLabel>
              <Select
                labelId='role-select-label'
                id='role-select'
                value={userRole}
                onChange={handleRoleChange}
                label='Role'
              >
                {rolesState.roles.map(role => (
                  <MenuItem value={role._id} key={role._id}>
                    {role.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Form>
      <ActionButtons loading={loading} submit={update} handleCancel={handleClose} submitText='Update' />
    </>
  )
}

export default EditUserRole
