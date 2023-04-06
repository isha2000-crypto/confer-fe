import { Card, Typography, CardContent } from '@mui/material'
import React from 'react'
import styles from './ContainerQuestions.module.scss'

interface Props {
  assessment: any
  currentTask: any
}
function ContainerQuestion({ assessment, currentTask }: Props) {
  return (
    <Card className={styles.questionContainer}>
      <Card className={styles.questionNumberCard} color='primary'>
        <Typography className={styles.questionNumberCard_paragraph} paragraph={true}>
          {`Question ${assessment.tasks.findIndex((it: any) => it._id === currentTask._id) + 1}/${
            assessment.tasks.length
          }`}
        </Typography>
      </Card>
      <CardContent>
        <Card className={styles.questionCard}>
          <CardContent>
            <Typography className={styles.questionCard_paragraph} paragraph={true}>
              {currentTask.description}
            </Typography>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}

export default ContainerQuestion
