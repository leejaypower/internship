const authErrorMessageParser = (errorMessage, defaultMessage = '알 수 없는 오류입니다.') => {
  switch (errorMessage) {
    case 'Unauthorized':
    case '토큰 만료':
      return '로그인 후 다시 시도해주세요.'
    case 'NotFound':
      return '유저 정보를 찾을 수 없습니다.'
    case '이메일 중복':
      return '이미 등록되어있는 이메일 입니다.'
    default:
      return defaultMessage
  }
}

export default authErrorMessageParser
