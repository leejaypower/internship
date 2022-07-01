const naverErrorMap = (errorMessage) => {
  switch (errorMessage) {
    case 'invalid request':
    case 'Bad Request Exception':
    case 'Authentication Failed':
    case 'Permission Denied':
    case 'Not Found Exception':
    case 'Quota Exceeded':
    case 'Throttle Limited':
    case 'Rate Limited':
    case 'Request Entity Too Large':
    case 'Endpoint Error':
    case 'Endpoint Timeout':
    case 'Unexpected Error':
      return { title: '주소 변환 실패', desc: '주소 변환에 실패하였습니다.' }
    case 'unknown error':
    case 'io error':
      return { title: '주소 변환 실패', desc: '통신 중 에러가 발생했습니다.' }
    default:
      return { title: '통신 실패', desc: '통신 중 에러가 발생했습니다.' }
  }
}

export default naverErrorMap
