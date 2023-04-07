import { AbilityBuilder, Ability } from '@casl/ability'

// import { Roles } from '../custom-types/enum'
// import INVITE from '../custom-types/constants'
import { Role } from '@custom-types/contextTypes'

// import { ASSESSMENTS } from '@custom-types/constants'

export type Subjects = string
export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete'

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

  // if (role === Roles.SUPER_ADMIN) {
  //   can('manage', 'all')
  //   can(['read', 'write'], INVITE)
  // } else if (Roles.ADMIN === role) {
  //   can('manage', 'all')
  //   can(['read', 'write'], INVITE)
  // } else if (Roles.USER === role) {
  // can(['read', 'write'], ASSESSMENTS)
  console.log(subject)
  if (Object.keys(role).length !== 0) {
    can('manage', 'all')
  }

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
  action: 'manage',
  subject: 'all'
}

export default defineRulesFor
