// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

interface TableHeaderProps {
  value: string
  handleSearch: (val: string) => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { value, handleSearch } = props

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', justifyContent: 'right' }}>
      <Box sx={{ display: 'flex', justifyContent: 'right' }}>
        <TextField
          size='small'
          fullWidth
          value={value}
          placeholder='Search tenants'
          sx={{ mr: 6, mb: 2 }}
          onChange={e => handleSearch(e.target.value)}
        />
      </Box>
    </Box>
  )
}

export default TableHeader
