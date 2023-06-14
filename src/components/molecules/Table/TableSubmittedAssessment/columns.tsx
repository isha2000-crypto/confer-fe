import { Typography, Box } from '@mui/material'
import { MRT_ColumnDef } from 'material-react-table'
import { useMemo } from 'react'
import { formatDate } from 'src/@core/utils/format'
import RenderCustomAvatar from '../RenderCustomAvatar'
import CustomChip from 'src/@core/components/mui/chip'
import DateProvider from '@components/atoms/DateProvider'

interface CellType {
  row: any
}
const TableSubmittedAssessmentColumns = () => {
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorFn: (row: { assessment: { title: string } }) => {
          return row.assessment.title
        },
        accessorKey: 'assessment',
        header: 'Title',
        Cell: ({ row }: CellType) => {
          return (
            <Typography noWrap sx={{ color: 'text.secondary' }}>
              {row.original.assessment.title}
            </Typography>
          )
        }
      },
      {
        accessorFn: (row: { createdAt: string | Date }) => {
          return new Date(row.createdAt)
        },
        header: 'Created At',
        filterFn: 'lessThanOrEqualTo',
        sortingFn: 'datetime',
        Cell: ({ cell }) => formatDate(cell.getValue<Date>()),
        Filter: DateProvider
      },
      {
        accessorFn: (row: { user: { name: string; email: string } }) => {
          return row.user.name + ' ' + row.user.email
        },
        accessorKey: 'name',
        header: 'Submitted By',
        Cell: ({ row }: CellType) => {
          const { name } = row.original.user

          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <RenderCustomAvatar row={row.original.user} showEmail />
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

                <Typography noWrap variant='caption'>
                  {row.original.user.email}
                </Typography>
              </Box>
            </Box>
          )
        }
      },
      {
        accessorFn: (row: { tenant: { name: string } }) => {
          return row.tenant.name
        },
        accessorKey: 'tenant',
        header: 'Organization',
        Cell: ({ row }: CellType) => {
          return (
            <Typography noWrap sx={{ color: 'text.secondary' }}>
              {row.original.tenant.name}
            </Typography>
          )
        }
      },
      {
        accessorFn: (row: { status: string }) => {
          return row.status
        },
        accessorKey: 'status',
        header: 'Status',
        Cell: ({ row }: CellType) => {
          return (
            <CustomChip
              skin='light'
              size='small'
              label={row.original.status}
              color={'info'}
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
export default TableSubmittedAssessmentColumns
