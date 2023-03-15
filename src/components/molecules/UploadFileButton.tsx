import React from 'react'
import { Button } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { useAuth } from 'src/hooks/useAuth'
import ApiService from 'src/lib/api/ApiService'
import { Assessment } from '@custom-types/assessmentsType'
import { UserDataType } from '@custom-types/contextTypes'

function UploadFileButton() {
  const auth = useAuth()
  const api = ApiService()

  const tempAssessment: Assessment = {
    id: '1',
    type: 'leadership',
    title: 'Leading a Team',
    time: '15m',
    responses: '21',
    tasks: '5',
    author: 'Husnain'
  }
  const handleClick = async () => {
    const video = '/videos/temp-vid.mp4'
    const file = new Blob([video], { type: 'video/mp4' })
    const result = await api.uploadFile(file, auth?.user as UserDataType, tempAssessment)
    console.log('result', result)
  }

  return (
    <Button onClick={handleClick} variant='contained' color='secondary' startIcon={<Icon icon='mdi:upload-outline' />}>
      Upload File
    </Button>
  )
}

export default UploadFileButton
