// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import RenderCustomAvatar from './RenderCustomAvatar'
import { formatDate } from 'src/@core/utils/format'
import { useRouter } from 'next/router'
import { URLS } from '@custom-types/constants'

interface CellType {
  row: any
}

// ** renders client column

const tableColumns = [
  {
    flex: 0.15,
    field: 'title',
    minWidth: 150,
    headerName: 'Title',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 3 } }}>
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row.assessment.title}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 110,
    field: 'createdAt',
    headerName: 'Submitted At',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {formatDate(row.createdAt)}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 230,
    field: 'name',
    headerName: 'Submitted By',
    renderCell: ({ row }: CellType) => {
      const { name } = row.user

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <RenderCustomAvatar row={row.user} showEmail />
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
              {row.user.email}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 110,
    field: 'tenantName',
    headerName: 'Organization',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.tenant.name}
        </Typography>
      )
    }
  }
]

const TableSubmittedAssessments = ({ data }: any) => {
  const router = useRouter()

  // ** State
  const [pageSize, setPageSize] = useState<number>(10)
  const columns = [...tableColumns]

  const handleRowClick = ({ row }: CellType) => {
    router.push(`${URLS.ASSESSMENT_URL}/submitted/${row.userId}/${row._id}/view`)
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <DataGrid
              autoHeight
              rows={data}
              getRowId={row => row._id}
              columns={columns}
              pageSize={pageSize}
              disableSelectionOnClick
              rowsPerPageOptions={[10, 25, 50]}
              onPageSizeChange={newPageSize => setPageSize(newPageSize)}
              sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
              onRowClick={handleRowClick}
            />
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default TableSubmittedAssessments
