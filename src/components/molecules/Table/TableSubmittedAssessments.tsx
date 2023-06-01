// ** React Imports
import { useContext, useMemo, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'

import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import RenderCustomAvatar from './RenderCustomAvatar'
import { formatDate } from 'src/@core/utils/format'
import CustomChip from 'src/@core/components/mui/chip'

import { useRouter } from 'next/router'

import { MRT_ColumnDef, MaterialReactTable } from 'material-react-table'
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

interface CellType {
  row: any
}

const TableSubmittedAssessments = ({ data }: any) => {
  const router = useRouter()
  const ability = useContext(AbilityContext)
  const [open, setOpen] = useState(false)
  const [selectedAssessmentId, setSelectedAssessmentId] = useState('')
  const dispatch = useDispatch<AppDispatch>()
  const [removeSubmittedAssessment] = useMutation(DELETE_SUBMITTED_ASSESSMENT)
  const handleClose = () => {
    setOpen(false)
  }
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'title',
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
          return formatDate(row.createdAt)
        },
        header: 'Created At'
      },
      {
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
        accessorKey: 'tenantName',
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
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        Cell: ({ row }: CellType) => (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={e => handleDelete(e, row.original._id)}>
              <Icon icon='mdi:bin-outline' />
            </IconButton>
          </Box>
        )
      }
    ],
    []
  )

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
        columns={columns}
        data={data}
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => {
            router.push(`${URLS.ASSESSMENT_URL}/submitted/${row.original.userId}/${row.original._id}/view`)
          },
          sx: {
            cursor: 'pointer'
          }
        })}
        initialState={{
          columnVisibility: { actions: ability?.can(ACTIONS.DELETE, SUBJECTS.ASSESSMENT_SUBMISSION_MANAGEMENT) }
        }}
      />
    </>
  )
}

export default TableSubmittedAssessments
