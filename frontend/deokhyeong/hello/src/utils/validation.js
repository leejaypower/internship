export const checkEmailValidation = (email) => {
  if (!email) return false

  const reggex = /.+@.+/g
  const result = reggex.test(email)

  return result
}

export const emailVaildationRule = (email) => {
  const faliMessage = '올바른 이메일 형식을 입력해주세요'

  return checkEmailValidation(email) || faliMessage
}
