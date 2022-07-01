const passwordCheckRules = [
  (v) => (!!v && !!v.trim()) || '비밀번호 확인하기는 필수 입력값입니다.',
]

export default passwordCheckRules
