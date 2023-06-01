// ** React Imports
import { useContext, useMemo, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'

import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Components Imports
import { UsersType } from '@custom-types/user-type'

import DialogUserEdit from '../Dialog/DialogUserEdit/DialogUserEdit'
import RowOptions from './rowOptions'
import { IconButton } from '@mui/material'
import { Icon } from '@iconify/react'

import { useRouter } from 'next/router'
import { SyntheticEvent } from 'react-draft-wysiwyg'

import { MRT_ColumnDef, MaterialReactTable } from 'material-react-table'
import { ACTIONS, SUBJECTS } from '@custom-types/enum'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import RenderCustomAvatar from '../Table/RenderCustomAvatar'
import { URLS } from '@custom-types/constants'

interface UserStatusType {
  [key: string]: ThemeColor
}

interface CellType {
  row: any
}

const userStatusObj: UserStatusType = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

const TableUsersList = ({ users, anchor }: { users: any; anchor: boolean }) => {
  // ** State
  const ability = useContext(AbilityContext)

  const [selectedUser, setSelectedUser] = useState<UsersType>()
  const [open, setOpen] = useState<boolean>(false)
  const router = useRouter()

  const handleEditRole = (event: SyntheticEvent, user: UsersType) => {
    event.stopPropagation()
    setSelectedUser(user)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        header: 'Author',
        Cell: ({ row }: CellType) => {
          const { name } = row.original

          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <RenderCustomAvatar row={row.original} />
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
        accessorKey: 'email',
        header: 'Email',
        Cell: ({ renderedCellValue }: any) => (
          <CustomChip
            skin='light'
            size='small'
            label={renderedCellValue}
            color='primary'
            sx={{ textTransform: 'capitalize' }}
            key={renderedCellValue}
          />
        )
      },
      {
        accessorKey: 'role',
        header: 'Role',
        Cell: ({ row }: CellType) => {
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 3 } }}>
              <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                {row.original.role.title}
              </Typography>
            </Box>
          )
        }
      },
      {
        accessorKey: 'email_verified',
        header: 'Status',
        Cell: ({ row }: CellType) => {
          const { email_verified } = row.original

          return (
            <CustomChip
              skin='light'
              size='small'
              label={email_verified ? 'active' : 'pending'}
              color={userStatusObj[email_verified ? 'active' : 'pending']}
              sx={{ textTransform: 'capitalize' }}
            />
          )
        }
      },
      {
        accessorKey: '_id',
        header: 'Actions',
        Cell: ({ row }: CellType) =>
          !anchor ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                onClick={event => handleEditRole(event, row.original)}
                disabled={row.original.role.title === 'Super Admin'}
              >
                <Icon icon='mdi:pencil-outline' />
              </IconButton>
            </Box>
          ) : (
            <RowOptions />
          )
      }
    ],
    []
  )

  return (
    <>
      {open && <DialogUserEdit handleClose={handleClose} open={open} user={selectedUser as UsersType} />}
      <MaterialReactTable
        columns={columns}
        data={users}
        initialState={{ columnVisibility: { actions: ability?.can(ACTIONS.UPDATE, SUBJECTS.ROLES) && true } }}
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => {
            router.push(`${URLS.ADMIN}/users/${row.original._id}/view`)
          },
          sx: {
            cursor: 'pointer'
          }
        })}
      />
    </>
  )
}

export default TableUsersList
