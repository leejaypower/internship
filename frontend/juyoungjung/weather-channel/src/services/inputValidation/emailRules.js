const emailRules = [
  (v) => (!!v && !!v.trim()) || '이메일은 필수 입력값입니다.',
  (v) => {
    // eslint-disable-next-line no-useless-escape
    const emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i

    return emailRegex.test(v) || '이메일 형식에 맞게 작성해주세요.'
  },
]

export default emailRules
