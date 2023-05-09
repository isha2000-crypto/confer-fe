import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

import { UsersType } from '@custom-types/user-type'

interface props {
  row: UsersType
  showEmail?: boolean
}

const RenderCustomAvatar = ({ row }: props) => {
  if (row.picture) {
    return (
      <CustomAvatar
        src={row.picture}
        sx={{ mr: 3, width: 34, height: 34 }}
        imgProps={{ referrerPolicy: 'no-referrer' }}
      />
    )
  } else {
    return (
      <>
        <CustomAvatar skin='light' color={'primary'} sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}>
          {getInitials(row.name ? row.name : '--')}
        </CustomAvatar>
      </>
    )
  }
}

export default RenderCustomAvatar
