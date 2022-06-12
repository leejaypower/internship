import { IDValidationRule, passwordValidationRule, nameValidationRule } from './validationRules'
import authInterceptor from './authInterceptor'

const auth = {
  IDValidationRule,
  passwordValidationRule,
  nameValidationRule,
  authInterceptor,
}

export default auth
