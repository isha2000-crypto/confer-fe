import { SUBJECT_TITLES } from '@custom-types/constants'
import { SUBJECTS } from '@custom-types/enum'

export const getSubjectTitles = () => {
  const subjectValues: any = Object.values(SUBJECTS)
  subjectValues.splice(0, 1)

  // const publicIndex = subjectValues.findIndex('public')
  // if (publicIndex > -1) subjectValues.splice(publicIndex, 1)

  const rolesArr: any = subjectValues.map((value: any) => ({
    label: SUBJECT_TITLES[value] as any,
    value: value
  }))

  return rolesArr
}
