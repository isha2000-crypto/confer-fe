import { Button, styled } from '@mui/material'

const StyledButton = styled(Button, { shouldForwardProp: props => props !== 'active' })<any>(({ active, theme }) => ({
  padding: 0,
  minWidth: theme.spacing(7) + 2,
  height: theme.spacing(7) + 2,
  width: theme.spacing(7) + 2,
  marginRight: theme.spacing(2),
  marginBottom: theme.spacing(1),
  border: '2px solid transparent',
  alignItems: 'stretch',
  transitionProperty: 'transform, border-color',

  transitionDuration: '0.2s',
  transitionTimingFunction: theme.transitions.easing.easeInOut,
  borderColor: active ? theme.palette.primary.main : '',
  '&:hover': {
    transform: 'scale(1.125)'
  }
}))

type SelectionButtonProps = {
  active: boolean
  disabled?: boolean
  children: React.ReactNode
  onClick?: () => void
}
function SelectionButton(props: SelectionButtonProps) {
  return (
    <StyledButton active={props.active} disabled={props.disabled} onClick={props.onClick}>
      {props.children}
    </StyledButton>
  )
}

export default SelectionButton
