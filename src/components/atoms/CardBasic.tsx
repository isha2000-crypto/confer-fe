// ** MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { SxProps } from '@mui/material/styles'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  sxContent?: SxProps
}

const CardBasic = ({ children, sxContent }: Props) => {
  return (
    <Card>
      <CardContent sx={sxContent}>{children}</CardContent>
    </Card>
  )
}

export default CardBasic
