export const idRules = [
  (id) => !!id || '아이디를 입력해 주세요',
  (id) => !id.split('').includes(' ') || '공백은 안됩니다!',
  (id) => id.length >= 5 || '아이디는 5자 이상입니다.',
]

export const pwRules = [
  (pw) => !!pw || '비밀번호를 입력해 주세요',
  (pw) => pw.length >= 6 || '비밀번호는 6자 이상입니다',
  (pw) => !pw.split('').includes(' ') || '공백은 안됩니다!',
]
