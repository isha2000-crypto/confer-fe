import { Box, Typography } from '@mui/material'
import { MRT_ColumnDef } from 'material-react-table'
import { useMemo } from 'react'
import RenderCustomAvatar from '../RenderCustomAvatar'
import CustomChip from 'src/@core/components/mui/chip'
import { ThemeColor } from 'src/@core/layouts/types'

interface UserStatusType {
  [key: string]: ThemeColor
}

const userStatusObj: UserStatusType = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}
interface CellType {
  row: any
}
const TableUsersListColumns = () => {
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'name',
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
        accessorFn: (row: { role: { title: string } }) => {
          return row.role.title
        },
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
        accessorFn: (row: { email_verified: boolean }) => {
          return row.email_verified ? 'active' : 'pending'
        },
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
      }
    ],
    []
  )

  return columns
}
export default TableUsersListColumns
