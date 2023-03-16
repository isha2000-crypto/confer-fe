import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '..'

const assessmentsState = (state: RootState) => state.assessments.assessments

export const getAssessmentById = (state: RootState, assessmentId: string) =>
  createSelector(assessmentsState, state => state.filter(assessment => assessment.id === assessmentId))
