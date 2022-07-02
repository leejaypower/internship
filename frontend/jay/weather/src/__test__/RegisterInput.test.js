import {
  registerNameRules, registerIdRules, registerPasswordRules, getConfirmPasswordRules,
} from '@/util/formRules'

describe('회원가입 입력 유효성 검사', () => {
  test('이름은 공백없이 한글 단어로 2자에서 6자 사이어야 한다.', () => {
    const nameMinimumLengthRules = registerNameRules[1]
    const nameMaxLengthRules = registerNameRules[2]
    const nameKoreanRules = registerNameRules[3]
    const inputValue = '제이'

    const inputTest = nameMinimumLengthRules(inputValue)
    const inputTest2 = nameMaxLengthRules(inputValue)
    const inputTest3 = nameKoreanRules(inputValue)

    expect(inputTest).toBe(true)
    expect(inputTest2).toBe(true)
    expect(inputTest3).toBe(true)
  })

  test('아이디는 이메일 형식이어야 한다.', () => {
    const idRules = registerIdRules[1]
    const inputValue = idRules('qwer@qwer.com')

    expect(inputValue).toBe(true)
  })

  test('비밀번호는 문자와 숫자 조합이어야 하며 8자에서 20자 사이어야 한다.', () => {
    const inputValue = 'qwer1234'
    const passwordCharacterRules = registerPasswordRules[1]
    const passwordLengthRules = registerPasswordRules[2]

    const inputTest = passwordCharacterRules(inputValue)
    const inputTest2 = passwordLengthRules(inputValue)

    expect(inputTest).toBe(true)
    expect(inputTest2).toBe(true)
  })

  test('비밀번호 확인 값은 비밀번호와 같아야 한다.', () => {
    const pw = 'qwer1234'
    const inputValue = 'qwer1234'
    const passwordConfirmRule = getConfirmPasswordRules(pw)
    const passwordConfirm = passwordConfirmRule[1](inputValue)

    expect(passwordConfirm).toBe(true)
  })
})
