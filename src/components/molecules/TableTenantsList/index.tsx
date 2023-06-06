// ** React Imports
import { useMemo, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'

import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import { IconButton, Switch } from '@mui/material'
import Icon from 'src/@core/components/icon'

import { formatDate } from 'src/@core/utils/format'
import CustomChip from 'src/@core/components/mui/chip'
import { ThemeColor } from 'src/@core/layouts/types'
import { useLazyQuery, useMutation } from '@apollo/client'
import { UPDATE_TENANT_STATUS } from 'src/lib/graphql/Mutation/tenantMutation'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'
import { fetchTenants } from 'src/store/tenants/tenantsActions'

import DialogTenantCreate from '../Dialog/DialogTenant/DialogTenantCreate'
import { FETCH_TENANT_BY_ID } from 'src/lib/graphql/Query'
import { MRT_ColumnDef, MaterialReactTable } from 'material-react-table'

interface CellType {
  row: any
}
interface UserStatusType {
  [key: string]: ThemeColor
}
const userStatusObj: UserStatusType = {
  active: 'success',
  disabled: 'error'
}
const label = { inputProps: { 'aria-label': 'Color switch demo' } }

const TableTenantsList = ({ tenants }: any) => {
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        Cell: ({ renderedCellValue }: any) => (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                variant='subtitle2'
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {renderedCellValue}
              </Typography>
            </Box>
          </Box>
        )
      },
      {
        accessorKey: 'domains',
        header: 'Domain',
        Cell: ({ renderedCellValue }: any) =>
          renderedCellValue.map((domain: string[], index: number) => {
            return (
              <CustomChip
                skin='light'
                size='small'
                label={domain}
                color='primary'
                sx={{ textTransform: 'capitalize' }}
                key={index}
              />
            )
          })
      },
      {
        accessorFn: (row: { disabled: boolean }) => {
          return row.disabled ? 'disabled' : 'active'
        },
        accessorKey: 'disabled',
        header: 'Status',
        Cell: ({ row }: CellType) => {
          const { disabled } = row.original

          return (
            <CustomChip
              skin='light'
              size='small'
              label={disabled ? 'disabled' : 'active'}
              color={userStatusObj[disabled ? 'disabled' : 'active']}
              sx={{ textTransform: 'capitalize' }}
            />
          )
        }
      },
      {
        accessorFn: (row: { createdAt: string | Date }) => {
          return formatDate(row.createdAt)
        },
        header: 'Created At'
      },
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
    ],
    []
  )

  const [open, setOpen] = useState(false)
  const [selectedTenant, setSelectedTenant] = useState(null)

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

  if (error) return <div>Error</div>

  return (
    <>
      {open && <DialogTenantCreate open={open} handleClose={handleClose} dialogTitle='Edit' tenant={selectedTenant} />}
      <MaterialReactTable columns={columns} data={tenants} />
    </>
  )
}

export default TableTenantsList
