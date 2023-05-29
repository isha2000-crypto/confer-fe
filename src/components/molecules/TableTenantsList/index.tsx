// ** React Imports
import { useContext, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import { IconButton, Switch } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { ACTIONS, SUBJECTS } from '@custom-types/enum'
import { TenantsType } from '@custom-types/tenants-type'
import { formatDate } from 'src/@core/utils/format'
import TableHeader from '../TableUsersList/TableHeader'
import CustomChip from 'src/@core/components/mui/chip'
import { ThemeColor } from 'src/@core/layouts/types'
import { useMutation } from '@apollo/client'
import { UPDATE_TENANT_STATUS } from 'src/lib/graphql/Mutation/tenantMutation'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'
import { fetchTenants } from 'src/store/tenants/tenantsActions'

interface CellType {
  row: TenantsType
}
interface UserStatusType {
  [key: string]: ThemeColor
}
const userStatusObj: UserStatusType = {
  active: 'success',
  disabled: 'error'
}
const label = { inputProps: { 'aria-label': 'Color switch demo' } }

const tableColumns = [
  {
    flex: 0.2,
    minWidth: 230,
    field: 'name',
    headerName: 'Name',
    renderCell: ({ row }: CellType) => {
      const { name } = row

      return (
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
              {name}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 250,
    field: 'domain',
    headerName: 'Domain',
    renderCell: ({ row }: CellType) => {
      return row.domains.map((domain, index) => {
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
    }
  },
  {
    flex: 0.1,
    minWidth: 110,
    field: 'disabled',
    headerName: 'Status',
    renderCell: ({ row }: CellType) => {
      return (
        <CustomChip
          skin='light'
          size='small'
          label={row.disabled ? 'disabled' : 'active'}
          color={userStatusObj[row.disabled ? 'disabled' : 'active']}
          sx={{ textTransform: 'capitalize' }}
        />
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 110,
    field: 'created_at',
    headerName: 'CreatedAt',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography variant='body2' noWrap>
          {formatDate(row.createdAt)}
        </Typography>
      )
    }
  }
]

const TableTenantsList = ({ tenants }: any) => {
  // ** State
  const ability = useContext(AbilityContext)
  const [pageSize, setPageSize] = useState<number>(10)
  const [value, setValue] = useState('')
  const [filteredData, setFilteredData] = useState<TenantsType[]>([])
  const [UpdateTenantStatus] = useMutation(UPDATE_TENANT_STATUS)

  const dispatch = useDispatch<AppDispatch>()
  const handleEditTenant = (id: string) => {
    console.log('Edit Role', id)
  }
  const escapeRegExp = (value: string) => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
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

  const handleSearch = (searchValue: string) => {
    setValue(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')
    const filteredRows = tenants.filter((row: any) => {
      return Object.keys(row).some(field => {
        // @ts-ignore
        return searchRegex.test(row[field].toString())
      })
    })
    if (searchValue.length) {
      setFilteredData(filteredRows)
    } else {
      setFilteredData([])
    }
  }
  const columns = [
    ...tableColumns,

    {
      flex: 0.15,
      minWidth: 115,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => handleEditTenant(row._id)}>
            <Icon icon='mdi:pencil-outline' />
          </IconButton>
          <IconButton onClick={() => handleEditTenant(row._id)}>
            <Icon icon='mdi:bin-outline' color='red' />
          </IconButton>
        </Box>
      )
    },

    {
      flex: 0.1,
      minWidth: 110,
      sortable: false,
      field: 'status_update',
      headerName: 'Disabled',
      renderCell: ({ row }: CellType) => {
        return <Switch checked={row.disabled} {...label} onChange={e => handleStatusChange(e, row._id)} />
      }
    }
  ]

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <TableHeader value={value} handleSearch={handleSearch} />
            <DataGrid
              autoHeight
              rows={filteredData.length ? filteredData : tenants}
              getRowId={row => row._id}
              columns={columns}
              pageSize={pageSize}
              disableSelectionOnClick
              rowsPerPageOptions={[10, 25, 50]}
              onPageSizeChange={newPageSize => setPageSize(newPageSize)}
              sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
              columnVisibilityModel={{
                actions: ability?.can(ACTIONS.UPDATE, SUBJECTS.USER_INVITATION) && true
              }}
            />
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default TableTenantsList
