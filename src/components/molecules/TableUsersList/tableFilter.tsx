import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'

const TableFilter = ({ tenant, handleTenantChange }: { tenant: string; handleTenantChange: any }) => {
  const tenantStore = useSelector((store: RootState) => store.tenants)

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', justifyContent: 'right' }}>
      <Box sx={{ display: 'flex', justifyContent: 'right' }}>
        <FormControl>
          <InputLabel id='demo-simple-select-outlined-label'>Tenant</InputLabel>
          <Select
            label='Tenant'
            value={tenant}
            onChange={handleTenantChange}
            id='demo-simple-select-outlined'
            labelId='demo-simple-select-outlined-label'
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            {tenantStore.tenants.map(tenant => (
              <MenuItem value={tenant._id} key={tenant._id}>
                {tenant.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  )
}

export default TableFilter
