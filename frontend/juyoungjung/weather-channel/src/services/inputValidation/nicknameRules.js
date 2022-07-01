const nicknameRules = [
  (v) => (!!v && !!v.trim()) || '닉네임은 필수 입력값입니다.',
  (v) => (v && v.length <= 10) || '닉네임은 10글자 이하로 입력해주세요.',
]

export default nicknameRules
