// ** React Imports
import { useContext, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'

import Typography from '@mui/material/Typography'

import { useRouter } from 'next/router'

import { MaterialReactTable } from 'material-react-table'
import { URLS } from '@custom-types/constants'
import { Dialog, DialogTitle, Button, IconButton } from '@mui/material'
import toast from 'react-hot-toast'
import { fetchAssessments } from 'src/store/assessments/assessmentsSlice'
import Icon from 'src/@core/components/icon'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'
import { useMutation } from '@apollo/client'
import { DELETE_SUBMITTED_ASSESSMENT } from 'src/lib/graphql/Mutation'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { ACTIONS, SUBJECTS } from '@custom-types/enum'
import TableSubmittedAssessmentColumns from './columns'

interface CellType {
  row: any
}
const TableSubmittedAssessments = ({ data }: any) => {
  const tableColumns = TableSubmittedAssessmentColumns()
  const router = useRouter()
  const ability = useContext(AbilityContext)
  const [open, setOpen] = useState(false)
  const [selectedAssessmentId, setSelectedAssessmentId] = useState('')
  const dispatch = useDispatch<AppDispatch>()
  const [removeSubmittedAssessment] = useMutation(DELETE_SUBMITTED_ASSESSMENT)
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
  if (ability?.can(ACTIONS.UPDATE, SUBJECTS.ASSESSMENT_SUBMISSION_MANAGEMENT)) {
    tableColumns.push({
      accessorKey: 'actions',
      header: 'Actions',
      Cell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={e => handleDelete(e, row.original._id)}>
            <Icon icon='mdi:bin-outline' />
          </IconButton>
        </Box>
      )
    })
  }

  return (
    <>
      {
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
      }
      <MaterialReactTable
        columns={tableColumns}
        data={data}
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => {
            router.push(`${URLS.ASSESSMENT_URL}/submitted/${row.original.userId}/${row.original._id}/view`)
          },
          sx: {
            cursor: 'pointer'
          }
        })}
        enableHiding
        initialState={{
          columnVisibility: { actions: ability?.can(ACTIONS.DELETE, SUBJECTS.ASSESSMENT_SUBMISSION_MANAGEMENT) }
        }}
      />
    </>
  )
}

export default TableSubmittedAssessments
