import { Skeleton, styled } from '@mui/material'
import SelectionButton from './SelectionButton'

type ThumbnailButtonProps = {
  thumbnailUrl?: string
  active: boolean
  children?: React.ReactNode
  onClick: () => void
  onLoad?: () => void
}

const StyledSkeleton = styled(Skeleton)(({ theme }) => ({
  width: 'calc(100% + 2px)',
  height: 'calc(100% + 2px)',
  margin: -1,
  borderRadius: theme.shape.borderRadius
}))

function ThumbnailButton(props: ThumbnailButtonProps) {
  return (
    <SelectionButton
      active={!!props.thumbnailUrl && props.active}
      disabled={!props.thumbnailUrl}
      onClick={props.onClick}
    >
      {props.thumbnailUrl ? (
        <img style={{ objectFit: 'cover' }} src={props.thumbnailUrl} alt='' onLoad={props.onLoad} />
      ) : (
        <StyledSkeleton variant='rectangular' />
      )}
      {props.children}
    </SelectionButton>
  )
}

export default ThumbnailButton
