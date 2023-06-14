// ** React Imports
import { useContext, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'

// ** Custom Components Imports
import { UsersType } from '@custom-types/user-type'

import DialogUserEdit from '@components/molecules/Dialog/DialogUserEdit/DialogUserEdit'
import { IconButton } from '@mui/material'
import { Icon } from '@iconify/react'

import { useRouter } from 'next/router'
import { SyntheticEvent } from 'react-draft-wysiwyg'

import { MaterialReactTable } from 'material-react-table'
import { ACTIONS, SUBJECTS } from '@custom-types/enum'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { URLS } from '@custom-types/constants'
import TableUsersListColumns from './columns'

interface CellType {
  row: any
}
const TableUsersList = ({ users }: { users: any }) => {
  // ** State
  const tableColumns = TableUsersListColumns()
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

  if (ability?.can(ACTIONS.UPDATE, SUBJECTS.ROLES)) {
    tableColumns.push({
      accessorKey: 'actions',
      header: 'Actions',
      Cell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={event => handleEditRole(event, row.original)}
            disabled={row.original.role.title === 'Super Admin'}
          >
            <Icon icon='mdi:pencil-outline' />
          </IconButton>
        </Box>
      )
    })
  }

  return (
    <>
      {open && <DialogUserEdit handleClose={handleClose} open={open} user={selectedUser as UsersType} />}
      <MaterialReactTable
        columns={tableColumns}
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
