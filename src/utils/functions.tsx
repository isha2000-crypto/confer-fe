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

  delete rolesArr[
    rolesArr.findIndex((obj: any) => {
      return obj.value === SUBJECTS.SYSTEM_ADMIN
    })
  ]

  return rolesArr
}

export const getPermissionsObject = (permissionsArr: any) => {
  const titles = getSubjectTitles()
  const permissionsObject: any = {}
  titles.forEach((title: any) => {
    const { value } = title
    permissionsObject[value] = []
    permissionsArr.forEach((permission: string) => {
      const permissionItem: string[] = permission.split('-')
      if (permissionItem[0] === value) {
        permissionsObject[value].push(permissionItem[1])
      }
    })
  })

  return permissionsObject
}
