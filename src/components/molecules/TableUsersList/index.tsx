// ** React Imports
import { ChangeEvent, useContext, useMemo, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Components Imports
import { UsersType } from '@custom-types/user-type'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { ACTIONS, SUBJECTS } from '@custom-types/enum'
import RenderCustomAvatar from '../Table/RenderCustomAvatar'

import DialogUserEdit from '../Dialog/DialogUserEdit/DialogUserEdit'
import RowOptions from './rowOptions'
import { IconButton } from '@mui/material'
import { Icon } from '@iconify/react'

import TableFilter from './tableFilter'
import { useRouter } from 'next/router'
import { SyntheticEvent } from 'react-draft-wysiwyg'
import { URLS } from '@custom-types/constants'
import QuickSearchToolbar from '../Data-Grid/QuickSearchToolbar'
import { escapeRegExp } from 'src/utils/functions'

interface UserStatusType {
  [key: string]: ThemeColor
}

interface CellType {
  row: UsersType
}

const userStatusObj: UserStatusType = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

const tableColumns = [
  {
    flex: 0.2,
    minWidth: 230,
    field: 'name',
    headerName: 'User',
    renderCell: ({ row }: CellType) => {
      const { name } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <RenderCustomAvatar row={row} />
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
    field: 'email',
    headerName: 'Email',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography variant='body2' noWrap>
          {row.email}
        </Typography>
      )
    }
  },
  {
    flex: 0.15,
    field: 'role',
    minWidth: 150,
    headerName: 'Role',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 3 } }}>
          <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
            {row.role.title}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 110,
    field: 'email_verified',
    headerName: 'Status',
    renderCell: ({ row }: CellType) => {
      return (
        <CustomChip
          skin='light'
          size='small'
          label={row.email_verified ? 'active' : 'pending'}
          color={userStatusObj[row.email_verified ? 'active' : 'pending']}
          sx={{ textTransform: 'capitalize' }}
        />
      )
    }
  }
]

const TableUsersList = ({ users, anchor, header }: { users: any; anchor: boolean; header: boolean }) => {
  // ** State
  const ability = useContext(AbilityContext)

  const [pageSize, setPageSize] = useState<number>(10)
  const [selectedUser, setSelectedUser] = useState<UsersType>()
  const [open, setOpen] = useState<boolean>(false)
  const [tenant, setTenant] = useState<string>('')
  const router = useRouter()

  const handleRowClick = ({ row }: CellType) => {
    router.push(`${URLS.ADMIN}/users/${row._id}/view`)
  }

  const handleEditRole = (event: SyntheticEvent, user: UsersType) => {
    event.stopPropagation()
    setSelectedUser(user)
    setOpen(true)
  }
  const filteredUsers = useMemo(() => {
    if (!tenant) return users
    else
      return users.filter((item: any) => {
        return item.tenantId === tenant
      })
  }, [tenant, users])
  const handleTenantChange = (event: any) => {
    setTenant(event.target.value)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const columns = [
    ...tableColumns,

    {
      flex: 0.15,
      minWidth: 80,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: CellType) =>
        !anchor ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={event => handleEditRole(event, row)} disabled={row.role.title === 'Super Admin'}>
              <Icon icon='mdi:pencil-outline' />
            </IconButton>
          </Box>
        ) : (
          <RowOptions />
        )
    }
  ]

  const [searchText, setSearchText] = useState<string>('')
  const [filteredData, setFilteredData] = useState<any>([])

  const handleSearch = (searchValue: string) => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')
    const filteredRows = filteredUsers.filter((row: any) => {
      return Object.keys(row).some(field => {
        // @ts-ignore
        console.log('Row field', row, field)

        return searchRegex.test(row[field]?.toString())
      })
    })
    if (searchValue.length) {
      setFilteredData(filteredRows)
    } else {
      setFilteredData([])
    }
  }

  return (
    <>
      {open && <DialogUserEdit handleClose={handleClose} open={open} user={selectedUser as UsersType} />}
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            {header && <TableFilter tenant={tenant} handleTenantChange={handleTenantChange} />}
            <DataGrid
              autoHeight
              onRowClick={handleRowClick}
              components={{ Toolbar: QuickSearchToolbar }}
              rows={filteredData.length ? filteredData : filteredUsers}
              getRowId={row => row._id}
              columns={columns}
              pageSize={pageSize}
              disableSelectionOnClick
              rowsPerPageOptions={[10, 25, 50]}
              onPageSizeChange={newPageSize => setPageSize(newPageSize)}
              sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
              columnVisibilityModel={{
                actions: ability?.can(ACTIONS.UPDATE, SUBJECTS.ROLES) && true
              }}
              componentsProps={{
                baseButton: {
                  variant: 'outlined'
                },
                toolbar: {
                  value: searchText,
                  clearSearch: () => handleSearch(''),
                  onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)
                }
              }}
            />
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default TableUsersList
