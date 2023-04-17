import * as React from 'react'
import Menu from '@mui/material/Menu'
import { VideoFilter } from '@custom-types/enum'
import { Button, Card, CardContent, Typography } from '@mui/material'
import SelectionIconButton from '@components/atoms/SelectionIconButton'
import ImageButton from '@components/atoms/ImageIconButton'
import { backgroundImageUrls } from 'src/utils/backgroundHelper'
import Icon from 'src/@core/components/icon'

interface Props {
  filterType: VideoFilter
  imageUrl: string | null
  menuAnchor: any
  setMenuAnchor: any
  handleMenuClick: any
  setImageUrl: any
}

export default function FilterMenu({
  filterType,
  imageUrl,
  setImageUrl,
  menuAnchor,
  setMenuAnchor,
  handleMenuClick
}: Props) {
  const [imageSources, setImageSources] = React.useState(backgroundImageUrls())
  const open = Boolean(menuAnchor)
  const handleClose = () => {
    setMenuAnchor(null)
  }

  const handleClick = (value: VideoFilter, imageUrl: string | null = null) => {
    handleMenuClick(value, imageUrl)
  }

  const imgFileHandler = (e: any) => {
    if (e.target.files.length !== 0) {
      const sources = [...imageSources]
      const uploadedImageUrl = URL.createObjectURL(e.target.files[0])
      sources.push(uploadedImageUrl)
      setImageSources(sources)
      setImageUrl(uploadedImageUrl)
    }
  }

  return (
    <Menu
      id='basic-menu'
      anchorEl={menuAnchor}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button'
      }}
    >
      <Card>
        <CardContent>
          <Typography variant='h6'>Background</Typography>
          <SelectionIconButton active={filterType === VideoFilter.NONE} onClick={() => handleClick(VideoFilter.NONE)}>
            <Icon icon='mdi:block' fontSize={65} />
          </SelectionIconButton>
          <SelectionIconButton active={filterType === VideoFilter.BLUR} onClick={() => handleClick(VideoFilter.BLUR)}>
            <Icon icon='mdi:blur' fontSize={65} />
          </SelectionIconButton>
          <Typography variant='h6'>Image</Typography>
          <SelectionIconButton active={false}>
            <Button component='label' variant='outlined'>
              <Icon icon='mdi:upload' fontSize={50} />
              <input type='file' accept='image/*' hidden onChange={imgFileHandler} />
            </Button>
          </SelectionIconButton>
          {imageSources.map(url => (
            <ImageButton
              key={url}
              imageUrl={url}
              active={url === imageUrl}
              onClick={() => handleClick(VideoFilter.IMAGE, url)}
            />
          ))}
        </CardContent>
      </Card>
    </Menu>
  )
}
