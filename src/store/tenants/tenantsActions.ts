import client from 'src/lib/apollo/client'
import { setTenantsFailure, setTenantsStart, setTenantsSuccess } from './tenatsSlice'
import { LOAD_TENANTS } from 'src/lib/graphql/Query'

export const fetchTenants = () => async (dispatch: (arg0: { payload: any; type: string }) => void) => {
  dispatch(setTenantsStart())
  try {
    const { data } = await client.query({
      query: LOAD_TENANTS
    })

    dispatch(setTenantsSuccess(data.tenants))
  } catch (error: any) {
    dispatch(setTenantsFailure(error.message))
  }
}
