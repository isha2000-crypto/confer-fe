// ** React Imports
import { useState } from 'react'

import { useLazyQuery, useMutation } from '@apollo/client'
import { UPDATE_TENANT_STATUS } from 'src/lib/graphql/Mutation/tenantMutation'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'
import { fetchTenants } from 'src/store/tenants/tenantsActions'

import DialogTenantCreate from '../../Dialog/DialogTenant/DialogTenantCreate'
import { FETCH_TENANT_BY_ID } from 'src/lib/graphql/Query'
import { MaterialReactTable } from 'material-react-table'
import TableTenantsColumns from './columns'
import { Box, IconButton, Switch } from '@mui/material'
import Icon from 'src/@core/components/icon'

interface CellType {
  row: any
}
const label = { inputProps: { 'aria-label': 'Color switch demo' } }

const TableTenantsList = ({ tenants }: any) => {
  const [open, setOpen] = useState(false)
  const [selectedTenant, setSelectedTenant] = useState(null)
  const columns = TableTenantsColumns()

  const [UpdateTenantStatus] = useMutation(UPDATE_TENANT_STATUS)
  const [getTenant, { error }] = useLazyQuery(FETCH_TENANT_BY_ID)
  const dispatch = useDispatch<AppDispatch>()

  const handleEditTenant = async (id: string) => {
    const { data } = await getTenant({ variables: { tenantId: id } })
    setSelectedTenant(data?.tenant)
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const updatedTenant = {
      disabled: event.target.checked
    }

    UpdateTenantStatus({
      variables: { updateTenantStatusInput: { ...updatedTenant }, updateTenantStatusId: id }
    })
      .then(result => {
        dispatch(fetchTenants())
        console.log(result.data)
      })
      .catch(reason => {
        dispatch(fetchTenants())
        console.log(reason)
      })
  }
  const tableColumns = [
    ...columns,
    {
      accessorKey: '_id',
      header: 'Actions',
      Cell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => handleEditTenant(row.original._id)}>
            <Icon icon='mdi:pencil-outline' />
          </IconButton>
        </Box>
      )
    },
    {
      accessorKey: '_id',
      header: 'Disabled',
      Cell: ({ row }: CellType) => {
        const { disabled, _id } = row.original

        return <Switch checked={disabled} {...label} onChange={e => handleStatusChange(e, _id)} />
      }
    }
  ]
  if (error) return <div>Error</div>

  return (
    <>
      {open && <DialogTenantCreate open={open} handleClose={handleClose} dialogTitle='Edit' tenant={selectedTenant} />}
      <MaterialReactTable columns={tableColumns} data={tenants} />
    </>
  )
}

export default TableTenantsList
