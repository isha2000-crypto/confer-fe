import { Assessment } from '@custom-types/assessmentsType'
import { Box, Typography } from '@mui/material'
import { MRT_ColumnDef } from 'material-react-table'
import { formatDate } from 'src/@core/utils/format'
import { displayTime } from 'src/utils/timeFuncs'
import RenderCustomAvatar from '../RenderCustomAvatar'
import { useMemo } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

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
          return formatDate(row.createdAt)
        },
        header: 'Created At',
        Filter: ({ column }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              onChange={newValue => {
                column.setFilterValue(newValue)
              }}
              slotProps={{
                textField: {
                  helperText: 'Filter Mode: Less Than',
                  sx: { minWidth: '120px' },
                  variant: 'standard'
                }
              }}
              value={column.getFilterValue()}
            />
          </LocalizationProvider>
        )
      }
    ],
    []
  )

  return columns
}
export default AllAssessmentTableColumns
