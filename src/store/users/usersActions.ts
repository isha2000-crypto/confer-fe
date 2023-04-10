import client from 'src/lib/apollo/client'
import { LOAD_USERS } from 'src/lib/graphql/Query'
import { setUsersStart, setUsersSuccess, setUsersFailure } from './usersSlice'

// Define an async thunk to fetch the user data
export const fetchUsers = () => async (dispatch: (arg0: { payload: any; type: string }) => void) => {
  dispatch(setUsersStart())
  try {
    const { data } = await client.query({
      query: LOAD_USERS
    })

    dispatch(setUsersSuccess(data.users))
  } catch (error: any) {
    dispatch(setUsersFailure(error.message))
  }
}
