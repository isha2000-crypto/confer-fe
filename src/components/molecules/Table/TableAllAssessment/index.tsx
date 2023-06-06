// ** Custom Components Imports

import { useRouter } from 'next/router'
import { URLS } from '@custom-types/constants'

import { MaterialReactTable } from 'material-react-table'
import AllAssessmentTableColumns from './columns'

const TableAllAssessments = ({ data }: any) => {
  const router = useRouter()
  const tableColumns = AllAssessmentTableColumns()

  return (
    <MaterialReactTable
      columns={tableColumns}
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
