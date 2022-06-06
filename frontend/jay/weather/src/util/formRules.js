// 추후 과정에서 테스트 코드를 학습하고 적용해보겠습니다!

const registerNameRules = [
  (v) => !!v || '이름을 입력해주세요.',
  (v) => (v && v.length >= 2) || '이름은 2자 이상 입력해주세요.',
  (v) => (v && v.length <= 6) || '이름은 6자까지 입력할 수 있습니다.',
  (v) => /^[가-힣]*$/.test(v) || '이름은 한글 글자로만 공백없이 입력해주세요.',
]
const registerIdRules = [
  (v) => !!v || '아이디를 입력해주세요.',
  (v) => /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/.test(v) || '이메일 형식을 확인해주세요.',
]

const registerPasswordRules = [
  (v) => !!v || '비밀번호를 입력해주세요.',
  (v) => /^(?=.*\d)(?=.*[a-zA-ZS]).{8,}/.test(v) || '비밀번호는 문자와 숫자를 포함해야하며 8자 이상이어야 합니다.',
  (v) => !(v && v.length >= 20) || '비밀번호는 20자 이상 입력할 수 없습니다.',
]

const getConfirmPasswordRules = (pw) => [
  (v) => !!v || '비밀번호를 확인해주세요.',
  (v) => v === pw || '비밀번호가 일치하지 않습니다.',
]

const loginIdRules = [
  (v) => !!v || '아이디를 입력해주세요.',
]

const loginPasswordRules = [
  (v) => !!v || '비밀번호를 입력해주세요.',
]

export {
  registerNameRules, registerIdRules, registerPasswordRules, getConfirmPasswordRules,
  loginIdRules, loginPasswordRules,
}
