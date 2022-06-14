const translateResponseErrorCode = (code) => {
  let message = ''
  switch (code) {
    case 'Duplicated nickname':
      message = '다른 사용자가 이미 사용중인 닉네임입니다.'
      break
    case 'Duplicated email':
      message = '다른 사용자가 이미 사용중인 이메일입니다.'
      break
    case 'Duplicated email, nickname':
      message = '다른 사용자가 이미 사용중인 이메일과 닉네임입니다.'
      break
    case 'Wrong email or password':
      message = '잘못된 이메일 또는 비밀번호입니다.'
      break
    case 'Wrong password':
      message = '잘못된 비밀번호입니다.'
      break
    case 'Unauthorized request':
      message = '인증되지 않은 접근입니다. 다시 로그인해주세요.'
      break
    case 'Invalid request':
      message = '잘못된 요청입니다. 관리자에게 문의하세요.'
      break
    default:
      message = '알 수 없는 에러가 발생했습니다.'
  }

  return message
}

export default translateResponseErrorCode
