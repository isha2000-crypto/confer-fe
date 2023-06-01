// ** React Imports
import { useMemo } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'

import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import RenderCustomAvatar from './RenderCustomAvatar'
import { formatDate } from 'src/@core/utils/format'

import { useRouter } from 'next/router'

import { MRT_ColumnDef, MaterialReactTable } from 'material-react-table'
import { URLS } from '@custom-types/constants'

interface CellType {
  row: any
}

const TableSubmittedAssessments = ({ data }: any) => {
  const router = useRouter()
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
      }
    ],
    []
  )

  return (
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
    />
  )
}

export default TableSubmittedAssessments
