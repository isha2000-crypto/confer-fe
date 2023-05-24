import { AbilityBuilder, Ability } from '@casl/ability'
import { Role } from '@custom-types/contextTypes'
import { ACTIONS, SUBJECTS } from '@custom-types/enum'

// import { ASSESSMENTS } from '@custom-types/constants'

export type Subjects = string
export type Actions = 'CREATE' | 'READ' | 'UPDATE' | 'DELETE'

export type AppAbility = Ability<[Actions, Subjects]> | undefined

export const AppAbility = Ability as any
export type ACLObj = {
  action: Actions
  subject: string
}

/**
 * Please define your own Ability rules according to your app requirements.
 * We have just shown Admin and Client rules for demo purpose where
 * admin can manage everything and client can just visit ACL page
 */
const defineRulesFor = (role: Role, subject: string) => {
  const { can, rules } = new AbilityBuilder(AppAbility)
  const { permissions } = role
  const subjects = Object.keys(permissions)
  const typeNameIndex = subjects.indexOf('__typename')
  if (typeNameIndex > -1) subjects.splice(typeNameIndex, 1)

  if (subjects.length !== 0) {
    subjects.forEach(sub => {
      can(permissions[sub], sub)
    })
  }

  if (role && role.tenantId === null) {
    console.log('Role', role)
    can(Object.values(ACTIONS), SUBJECTS.SYSTEM_ADMIN)
  }

  can(ACTIONS.READ, SUBJECTS.PUBLIC)
  can(ACTIONS.READ, subject)

  return rules
}

export const buildAbilityFor = (role: Role, subject: string): AppAbility => {
  return new AppAbility(defineRulesFor(role, subject), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    // @ts-ignore
    detectSubjectType: object => object!.type
  })
}

export const defaultACLObj: ACLObj = {
  action: ACTIONS.READ,
  subject: SUBJECTS.PUBLIC
}

export default defineRulesFor
