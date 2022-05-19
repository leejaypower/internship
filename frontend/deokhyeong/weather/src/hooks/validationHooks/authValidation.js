import auth from '@/service/domain/auth'

const useEmailValidationHook = (email) => auth.emailValidation(email)
const usePasswordValidationHook = (password) => auth.passwordValidaion(password)

export default {
  useEmailValidationHook,
  usePasswordValidationHook,
}
