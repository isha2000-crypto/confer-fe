import React from 'react'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Icon from 'src/@core/components/icon'
import { Question_Types } from '../../../custom-types/enum'
import { memo } from 'react'
import styles from './CreateQuestions.module.scss'
import { useQuery } from '@apollo/client'
import { LOAD_CURRENT_TENANT } from 'src/lib/graphql/Query'
import { AnyARecord } from 'dns'
import InputQuestionDuration from '@components/atoms/InputQuestionDuration'
import { Field } from 'formik'

interface QuestionProps {
  formik: AnyARecord
  id: number
  index: number
  type: string
  description: string
  duration: number
  count: number
  isReadOnly?: boolean
  handleQuestionUpdate: (index: number, name: string, value: string | number) => void
  removeQuestion: (id: number) => void
}

const CreateQuestion = (props: QuestionProps) => {
  const { index } = props
  const { data } = useQuery(LOAD_CURRENT_TENANT)

  const handleQuestionDataChange = (event: any) => {
    const { name, value } = event.target
    if (name === 'description') {
      props.handleQuestionUpdate(props.count, name, String(value))
    } else {
      props.handleQuestionUpdate(props.count, name, value)
    }
  }
  const handleRemove = () => {
    props.removeQuestion(props.count)
  }

  const admin_duration = data?.currentTenant?.assessment_duration / 60
  console.log('count here ', props.count)

  return (
    <>
      <Grid
        container
        xs={12}
        sx={{
          padding: '20px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.25)',
          borderRadius: '20px',
          backgroundColor: 'background.paper',
          marginBottom: '20px'
        }}
      >
        <Grid item xs={12} sm={12}>
          <Typography variant='h6' className={styles.questionTitle} sx={{ marginTop: '15px', marginBottom: '15px' }}>
            Question {props.count + 1}
          </Typography>
          <FormControl fullWidth variant='outlined'>
            <InputLabel id='task-type-select-label'>Select task type</InputLabel>
            <Select
              labelId='task-type-select-label'
              id='task-type-select'
              label='Select task type'
              name='type'
              value={props.type}
              onChange={handleQuestionDataChange}
              disabled={props.isReadOnly}
              required
            >
              <MenuItem value='TEXTUAL'>{Question_Types.TEXTUAL}</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Field name={`questions[${index}].description`} type='textarea'>
            {({ field, meta }: any) => (
              <TextField
                label='Description'
                fullWidth
                multiline
                rows={4}
                placeholder='Description here'
                {...field}
                disabled={props.isReadOnly}
                sx={{ marginTop: '15px' }}
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error}
              />
            )}
          </Field>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ marginTop: '15px' }}>
          <Field name={`questions[${index}].duration`} type='number'>
            {({ field, meta }: any) => (
              <InputQuestionDuration
                disabled={props.isReadOnly}
                value={field.value}
                onChange={value => field.onChange({ target: { name: field.name, value } })}
                admin_duration={admin_duration}
                isReadOnly={props.isReadOnly}
                error={meta.touched && meta.error}
                helperText={`Duration value should be less then ${admin_duration}`}
              />
            )}
          </Field>
        </Grid>
        {!props.isReadOnly && (
          <div style={{ paddingLeft: '90%' }}>
            <Icon icon='mdi-cup-off' onClick={handleRemove} className={styles.red_icon} />
          </div>
        )}
      </Grid>
    </>
  )
}

export default memo(CreateQuestion)
