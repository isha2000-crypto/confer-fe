import { Assessment } from '@custom-types/assessmentsType'
import { Box, Typography } from '@mui/material'
import { MRT_ColumnDef } from 'material-react-table'
import { displayTime } from 'src/utils/timeFuncs'
import RenderCustomAvatar from '../RenderCustomAvatar'
import { useMemo } from 'react'
import { formatDate } from 'src/@core/utils/format'
import DateProvider from '@components/atoms/DateProvider'

interface CellType {
  row: any
}
const AllAssessmentTableColumns = () => {
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'title',
        header: ' Title',
        Cell: ({ renderedCellValue }: any) => {
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 3 } }}>
              <Typography noWrap sx={{ color: 'text.secondary' }}>
                {renderedCellValue}
              </Typography>
            </Box>
          )
        }
      },
      {
        accessorKey: 'type',
        header: 'Type',
        Cell: ({ renderedCellValue }: any) => {
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 3 } }}>
              <Typography noWrap sx={{ color: 'text.secondary' }}>
                {renderedCellValue}
              </Typography>
            </Box>
          )
        }
      },
      {
        accessorKey: 'tasks.length',
        header: 'No of Tasks',
        Cell: ({ renderedCellValue }: any) => {
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 3 } }}>
              <Typography noWrap sx={{ color: 'text.secondary' }}>
                {renderedCellValue}
              </Typography>
            </Box>
          )
        }
      },
      {
        accessorFn: (row: Assessment) => {
          return displayTime(row)
        },
        header: 'Total Time'
      },
      {
        accessorFn: (row: { author: { name: string; email: string } }) => {
          return row.author.name + ' ' + row.author.email
        },
        header: 'Author',
        Cell: ({ row }: CellType) => {
          const { name, email } = row.original.author

          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <RenderCustomAvatar row={row.original.author} showEmail />
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
                  {email}
                </Typography>
              </Box>
            </Box>
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
      }
    ],
    []
  )

  return columns
}
export default AllAssessmentTableColumns
