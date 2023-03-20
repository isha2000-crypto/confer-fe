// ** Icon Imports
import Icon from 'src/@core/components/icon'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Grid from '@mui/material/Grid'
import { display } from '@mui/system'

interface Props {
  icon: string
  text: string
  tooltip: string
}

function IconTypography({ icon, text, tooltip }: Props) {
  return (
    <Box
      sx={{
        py: 1.25,
        mb: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& svg': { color: 'primary.main', mr: 2.5 }
      }}
    >
      <Tooltip title={tooltip}>
        <Grid container sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
          <Icon icon={icon} fontSize={20} />
          <Typography variant='body2'>{text}</Typography>
        </Grid>
      </Tooltip>
    </Box>
  )
}

export default IconTypography
