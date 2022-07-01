import emailRules from '../inputValidation/emailRules'

describe('EmailInput.vue emailRules validation test', () => {
  test('EmailInput는 입력시 email형식이어야 한다.', () => {
    const emailRegexTest = emailRules[1]
    const result = emailRegexTest('test@test.com')

    expect(result).toBe(true)
  })
})
