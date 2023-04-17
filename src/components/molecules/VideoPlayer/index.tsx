import React, { SyntheticEvent, useEffect, useRef, useState } from 'react'
import styles from './VideoPlayer.module.scss'
import { CircularProgress, IconButton, Slider, Tooltip, styled } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { convertToTime } from 'src/utils/timeFuncs'
import ScreenFull from 'screenfull'

interface Props {
  source?: string
  id: string
  children?: any
}

const ProgressSlider = styled(Slider)({
  height: 5,
  '& .MuiSlider-track': {
    border: 'none'
  },
  '& .MuiSlider-thumb': {
    height: 16,
    width: 16,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit'
    },
    '&:before': {
      display: 'none'
    }
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#52af77',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)'
    },
    '& > *': {
      transform: 'rotate(45deg)'
    }
  }
})

function ValueLabelComponent(props: any) {
  const { children, value } = props

  return (
    <Tooltip
      enterTouchDelay={0}
      placement='top'
      title={Math.floor(value / 60) + ':' + ('0' + Math.floor(value % 60)).slice(-2)}
    >
      {children}
    </Tooltip>
  )
}

function VideoPlayer({ source, id, children }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [totalDuration, setTotalDuration] = useState(0)

  const handleDuration = () => {
    const vid: any = document.getElementById(`video-${id}`)
    if (vid && Number.isFinite(vid.duration)) {
      setTotalDuration(vid.duration)
    }
  }

  const videoHandler = (control: string) => {
    if (videoRef?.current) {
      if (control === 'play') {
        videoRef?.current.play()
        setPlaying(true)
        handleDuration()
      } else if (control === 'pause') {
        videoRef.current.pause()
        setPlaying(false)
      }
    }
  }

  const handleVideoClick = (e: SyntheticEvent) => {
    e.stopPropagation()
    if (playing) videoHandler('pause')
    else videoHandler('play')
  }

  const handleVideoEnded = () => {
    setPlaying(false)
  }

  const handleBuffering = () => {
    setLoading(true)
  }

  const handleLoadStart = () => {
    setLoading(true)
  }

  const handleLoadedData = () => {
    setLoading(false)
    handleDuration()
  }

  const handlePlaying = () => {
    setLoading(false)
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) setProgress(videoRef.current.currentTime)
  }

  const handlePlayerSeek = (e: Event | SyntheticEvent, newValue: number | number[]) => {
    if (videoRef.current && !Array.isArray(newValue)) videoRef.current.currentTime = newValue
  }

  const handlePlayerMouseSeekUp = (e: Event | SyntheticEvent, newValue: number | number[]) => {
    if (videoRef.current && !Array.isArray(newValue)) videoRef.current.currentTime = newValue
  }

  const handleFullScreenMode = () => {
    if (playerRef.current) ScreenFull.toggle(playerRef.current)
  }

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('waiting', handleBuffering)
      videoRef.current.addEventListener('timeupdate', handleTimeUpdate)
    }
  }, [])

  return (
    <div className={styles.video_wrapper} ref={playerRef}>
      <video
        id={`video-${id}`}
        ref={videoRef}
        className={styles.video}
        src={source}
        onClick={handleVideoClick}
        onEnded={handleVideoEnded}
        onLoadStart={handleLoadStart}
        onLoadedData={handleLoadedData}
        onPlaying={handlePlaying}
      >
        {children}
      </video>

      <div className={styles.play_button_container}>
        {!loading && !playing && (
          <IconButton
            color={'primary'}
            onClick={handleVideoClick}
            sx={{
              background: 'rgba(204,204,204,0.4)',
              transition: 'all ease-in-out 0.2s',
              '&:hover': {
                backgroundColor: 'rgba(204,204,204,0.4)',
                transform: 'scale(1.2)'
              }
            }}
          >
            <Icon icon='mdi:play' fontSize={60} />
          </IconButton>
        )}
        {loading && <CircularProgress />}
      </div>

      <div className={styles.video_controls}>
        {totalDuration ? (
          <div className={styles.video_controls_progress}>
            <p className={styles.video_controls_progress_time}>{convertToTime(progress)}</p>
            <ProgressSlider
              min={0}
              max={totalDuration}
              value={progress}
              onChange={handlePlayerSeek}
              onChangeCommitted={handlePlayerMouseSeekUp}
              valueLabelDisplay='auto'
              components={{
                ValueLabel: ValueLabelComponent
              }}
            />
            <p className={styles.video_controls_progress_time}>{convertToTime(totalDuration)}</p>
          </div>
        ) : null}

        <div className={styles.video_controls_buttons}>
          <IconButton
            onClick={handleFullScreenMode}
            sx={{
              color: 'white',
              transition: 'all ease-in-out 0.2s',
              borderColor: 'white',
              border: '1px solid',
              '&:hover': {
                transform: 'scale(1.1)'
              }
            }}
          >
            <Icon icon='mdi:fullscreen' fontSize={25} />
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer
