import Typography from '@mui/material/Typography'
import { ReactNode } from 'react'
import { HeadingVariant } from '@custom-types/UITypes'

interface Props {
  children: ReactNode
  variant: HeadingVariant
}
function Heading({ children, variant }: Props) {
  return (
    <Typography variant={variant} sx={{ mb: 2 }}>
      {children}
    </Typography>
  )
}

export default Heading
