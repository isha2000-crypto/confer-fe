import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const DateProvider = ({ column }: any) => {
  return (
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

export default DateProvider
