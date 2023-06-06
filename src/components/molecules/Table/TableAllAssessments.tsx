// ** React Imports
import { useMemo } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'

import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import RenderCustomAvatar from './RenderCustomAvatar'
import { formatDate } from 'src/@core/utils/format'

import { useRouter } from 'next/router'
import { URLS } from '@custom-types/constants'

import { displayTime } from 'src/utils/timeFuncs'

import { Assessment } from '@custom-types/assessmentsType'
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table'

interface CellType {
  row: any
}

const TableAllAssessments = ({ data }: any) => {
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
        header: 'Created At'
      }
    ],
    []
  )

  const router = useRouter()

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      getRowId={row => row._id}
      muiTableBodyRowProps={({ row }) => ({
        onClick: () => {
          router.push(`${URLS.ASSESSMENT_URL}/${row.original._id}/view`)
        },
        sx: {
          cursor: 'pointer'
        }
      })}
    />
  )
}

export default TableAllAssessments
