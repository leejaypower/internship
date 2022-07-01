const passwordRules = [
  (v) => (!!v && !!v.trim()) || '비밀번호는 필수 입력값입니다.',
  (v) => (v && v.length >= 4 && v.length <= 16) || '비밀번호는 4글자 이상 16글자 이하로 입력해주세요.',
]

export default passwordRules
