// ** React Imports
import React, { ChangeEvent, useContext, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import RenderCustomAvatar from './RenderCustomAvatar'
import { formatDate } from 'src/@core/utils/format'
import CustomChip from 'src/@core/components/mui/chip'

import { useRouter } from 'next/router'
import QuickSearchToolbar from '../Data-Grid/QuickSearchToolbar'
import { escapeRegExp } from 'src/utils/functions'
import { Button, Dialog, DialogTitle, IconButton } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { URLS } from '@custom-types/constants'
import { useMutation } from '@apollo/client'
import { DELETE_SUBMITTED_ASSESSMENT } from 'src/lib/graphql/Mutation'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'
import { fetchAssessments } from 'src/store/assessments/assessmentsSlice'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { ACTIONS, SUBJECTS } from '@custom-types/enum'

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
  },
  {
    flex: 0.1,
    minWidth: 110,
    field: 'status',
    headerName: 'Status',
    renderCell: ({ row }: CellType) => {
      return (
        <CustomChip skin='light' size='small' label={row.status} color={'info'} sx={{ textTransform: 'capitalize' }} />
      )
    }
  }
]

const TableSubmittedAssessments = ({ data }: any) => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [removeSubmittedAssessment] = useMutation(DELETE_SUBMITTED_ASSESSMENT)
  const ability = useContext(AbilityContext)

  // ** State
  const [pageSize, setPageSize] = useState<number>(10)
  const [open, setOpen] = useState(false)
  const [selectedAssessmentId, setSelectedAssessmentId] = useState('')
  const columns = [
    ...tableColumns,
    ability?.can(ACTIONS.DELETE, SUBJECTS.ASSESSMENT_SUBMISSION_MANAGEMENT) && {
      flex: 0.1,
      minWidth: 80,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={e => handleDelete(e, row._id)}>
            <Icon icon='mdi:bin-outline' />
          </IconButton>
        </Box>
      )
    }
  ]
  const handleClose = () => {
    setOpen(false)
  }
  const handleDelete = (event: any, id: string) => {
    event.stopPropagation()
    setOpen(true)
    setSelectedAssessmentId(id)
  }
  const handleDeleteAssessment = () => {
    removeSubmittedAssessment({
      variables: { removeSubmittedAssessmentId: selectedAssessmentId }
    })
      .then(result => {
        if (result.data) {
          toast.success('Assessment Deleted Successfully')
          dispatch(fetchAssessments())
        }
      })
      .catch(reason => {
        console.error(reason.message)
      })
  }
  const handleRowClick = (params: any) => {
    const { row } = params
    router.push(`${URLS.ASSESSMENT_URL}/submitted/${row.userId}/${row._id}/view`)
  }

  const [searchText, setSearchText] = useState<string>('')
  const [filteredData, setFilteredData] = useState<any>([])

  const handleSearch = (searchValue: string) => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')
    const filteredRows = data.filter((row: any) => {
      return Object.keys(row).some(field => {
        // @ts-ignore
        return searchRegex.test(row[field].toString())
      })
    })
    if (searchValue.length) {
      setFilteredData(filteredRows)
    } else {
      setFilteredData([])
    }
  }

  return (
    <>
      <Grid container spacing={6}>
        <Dialog maxWidth='sm' onClose={handleClose} open={open}>
          <DialogTitle sx={{ textAlign: 'center' }}>
            <Typography variant='h5' component='span'>
              {` Are you sure you want to delete?`}
            </Typography>
          </DialogTitle>
          <Box
            className='demo-space-x'
            sx={{ display: 'flex', justifyContent: 'end', alignItems: 'flex-end', p: { xs: 6, sm: 6 } }}
          >
            <Button size='large' type='submit' variant='contained' onClick={handleDeleteAssessment}>
              {'Delete'}
            </Button>
            <Button size='large' color='secondary' variant='outlined' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Dialog>
        <Grid item xs={12}>
          <Card>
            <DataGrid
              autoHeight
              rows={filteredData.length ? filteredData : data}
              getRowId={row => row._id}
              columns={columns.map((column: any) => ({
                ...column,
                disableClickEventBubbling: true
              }))}
              pageSize={pageSize}
              disableSelectionOnClick
              components={{ Toolbar: QuickSearchToolbar }}
              rowsPerPageOptions={[10, 25, 50]}
              onPageSizeChange={newPageSize => setPageSize(newPageSize)}
              sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
              onRowClick={handleRowClick}
              componentsProps={{
                baseButton: {
                  variant: 'outlined'
                },
                toolbar: {
                  value: searchText,
                  clearSearch: () => handleSearch(''),
                  onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)
                }
              }}
            />
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default TableSubmittedAssessments
