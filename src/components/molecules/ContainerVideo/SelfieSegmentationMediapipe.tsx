/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'
import { Camera } from '@mediapipe/camera_utils'
import { SelfieSegmentation } from '@mediapipe/selfie_segmentation'
import { VideoFilter } from '@custom-types/enum'

interface Props {
  inputVideoRef: any
  canvasRef: any
  className: any
  filterType: VideoFilter
  imageUrl: string | null
}

function SelfieSegmentationMediapipe({ inputVideoRef, canvasRef, className, filterType, imageUrl }: Props) {
  const [selfieSegmentation, setSelfieSegmentation] = useState<SelfieSegmentation | null>(null)
  const ctx: any = useRef(null)
  const cameraRef: any = useRef(null)

  const init = () => {
    const selfieSegmentationObject = new SelfieSegmentation({
      locateFile: file => `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`
    })
    selfieSegmentationObject.reset()

    ctx.current = canvasRef.current.getContext('2d')

    const constraints = {
      video: { width: { min: 1280 }, height: { min: 720 } }
    }
    navigator.mediaDevices.getUserMedia(constraints).then(stream => {
      inputVideoRef.current.video.srcObject = stream
    })

    selfieSegmentationObject.setOptions({
      modelSelection: 1
    })

    selfieSegmentationObject.onResults(onResults)
    const camera = new Camera(inputVideoRef.current.video, {
      onFrame: async () => {
        if (!inputVideoRef.current) return
        await selfieSegmentationObject.send({ image: inputVideoRef.current.video })
      },
      width: 1280,
      height: 720
    })
    cameraRef.current = camera
    camera.start()
    setSelfieSegmentation(selfieSegmentationObject)
  }

  const onResults = (results: any) => {
    ctx.current.save()
    ctx.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    ctx.current.drawImage(results.segmentationMask, 0, 0, canvasRef.current.width, canvasRef.current.height)

    // Only overwrite existing pixels.
    ctx.current.globalCompositeOperation = 'source-out'

    if (filterType === VideoFilter.BLUR) {
      ctx.current.filter = 'blur(10px)'
      ctx.current.drawImage(results.image, 0, 0, canvasRef.current.width, canvasRef.current.height)
    } else if (filterType === VideoFilter.IMAGE) {
      const imgReact = document.getElementById('mediapipe-image')
      ctx.current.drawImage(imgReact, 0, 0, canvasRef.current.width, canvasRef.current.height)
    } else {
      ctx.current.drawImage(results.image, 0, 0, canvasRef.current.width, canvasRef.current.height)
    }

    // Only overwrite missing pixels.
    ctx.current.globalCompositeOperation = 'destination-atop'

    if (filterType === VideoFilter.BLUR) {
      ctx.current.filter = 'blur(0px)'
    }
    ctx.current.drawImage(results.image, 0, 0, canvasRef.current.width, canvasRef.current.height)
    ctx.current.restore()
  }

  useEffect(() => {
    if (inputVideoRef.current?.video) {
      init()
    } else {
      if (selfieSegmentation) {
        selfieSegmentation.close()
        setSelfieSegmentation(null)
      }
    }

    return () => {
      selfieSegmentation?.close()
      cameraRef.current?.stop()
    }
  }, [inputVideoRef])

  useEffect(() => {
    if (selfieSegmentation) {
      selfieSegmentation.reset()
      selfieSegmentation.onResults(onResults)
    }
  }, [filterType])

  return (
    <>
      <canvas className={className} ref={canvasRef} width={1280} height={720} />
      <img src={imageUrl ?? ''} alt='confer-image-background' id='mediapipe-image' />
    </>
  )
}

export default SelfieSegmentationMediapipe
