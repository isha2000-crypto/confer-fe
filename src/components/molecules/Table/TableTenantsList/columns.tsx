import { Box, Typography } from '@mui/material'
import { MRT_ColumnDef } from 'material-react-table'
import { useMemo } from 'react'
import { formatDate } from 'src/@core/utils/format'
import CustomChip from 'src/@core/components/mui/chip'
import { ThemeColor } from 'src/@core/layouts/types'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

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
const TableTenantsColumns = () => {
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
export default TableTenantsColumns
