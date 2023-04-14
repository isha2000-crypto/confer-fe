import SelectionButton from './SelectionButton'
import { styled } from '@mui/material/styles'

type SelectionIconButtonProps = {
  active: boolean
  children: React.ReactNode
  onClick?: () => void
}

function SelectionIconButton(props: SelectionIconButtonProps) {
  return (
    <SelectionButton active={props.active} onClick={props.onClick}>
      <StyledChildren>{props.children}</StyledChildren>
    </SelectionButton>
  )
}

const StyledChildren = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: 'rgba(0, 0, 0, 0.23)',
  borderRadius: theme.shape.borderRadius,
  margin: -1,
  boxSizing: 'content-box',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}))

export default SelectionIconButton
