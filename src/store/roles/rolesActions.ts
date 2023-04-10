import client from 'src/lib/apollo/client'
import { LOAD_ROLES } from 'src/lib/graphql/Query'
import { UPDATE_ROLE } from 'src/lib/graphql/Mutation'
import {
  setRolesFailure,
  setRolesStart,
  setRolesSuccess,
  setRoleUpdateSuccess,
  setRoleUpdateStart,
  setRoleUpdateFailure
} from './rolesSlice'

// Define an async thunk to fetch the user data
export const fetchRoles = () => async (dispatch: (arg0: { payload: any; type: string }) => void) => {
  dispatch(setRolesStart())
  try {
    const { data } = await client.query({
      query: LOAD_ROLES
    })

    dispatch(setRolesSuccess(data.roles))
  } catch (error: any) {
    dispatch(setRolesFailure(error.message))
  }
}

export const updateRole =
  (roleId: string, updateData: any) => async (dispatch: (arg0: { payload: any; type: string }) => void) => {
    dispatch(setRoleUpdateStart())
    try {
      const { data } = await client.mutate({
        mutation: UPDATE_ROLE,
        variables: { updateRoleId: roleId, updateRoleInput: updateData }
      })

      dispatch(setRoleUpdateSuccess(data.updateRole))
    } catch (error: any) {
      dispatch(setRoleUpdateFailure(error.message))
    }
  }
