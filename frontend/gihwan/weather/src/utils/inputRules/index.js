export const idRules = [
  (id) => !!id || '아이디를 입력해 주세요',
  (id) => !id?.split('').includes(' ') || '공백은 안됩니다!',
  (id) => id?.length >= 5 || '아이디는 5자 이상입니다.',
]

export const pwRules = [
  (pw) => !!pw || '비밀번호를 입력해 주세요',
  (pw) => pw?.length >= 6 || '비밀번호는 6자 이상입니다',
  (pw) => !pw?.split('').includes(' ') || '공백은 안됩니다!',
]

export const pwCheckRulesFunc = (pw) => [
  (pwCheck) => !!pwCheck || '비밀번호를 입력해 주세요',
  (pwCheck) => pwCheck === pw || '비밀번호가 일치하지 않습니다.',
]

export const nameRules = [
  (name) => !!name || '이름을 입력해 주세요',
  (name) => !name?.split('').includes(' ') || '공백은 안됩니다!',
  (name) => name?.length >= 2 || '이름은 2자 이상입니다.',
]

export const newPwRules = (currentPw) => [
  (newpw) => !!newpw || '비밀번호를 입력해 주세요',
  (newpw) => newpw.length >= 6 || '비밀번호는 6자 이상입니다',
  (newpw) => !newpw.split('').includes(' ') || '공백은 안됩니다!',
  (newPw) => newPw !== currentPw || '현재 비밀번호랑 같습니다.',
]

export const pwCheckRules = (pw) => [
  (pwCheck) => !!pwCheck || '비밀번호를 입력해 주세요',
  (pwCheck) => pwCheck === pw || '비밀번호가 일치하지 않습니다.',
]
