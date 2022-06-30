import commonErrorMessageMap from './commonErrorMessageMap'

/**
 * 각 에러 메세지의 구체적인 변환은 정보가 충분하지 않아 생략합니다.
 * 다만 에러 메세지에 대한 맵핑을 이런식으로 할 수 있다는 것을 보여드리고 싶었습니다.
 */
const naverErrorMessageParser = (errorMessage, defaultMessage) => {
  const errorMessageMap = {
    ...commonErrorMessageMap,
    'invalid request': '',
    'Bad Request Exception': '',
    'Authentication Failed': '',
    'Permission Denied': '',
    'Not Found Exception': '',
    'Quota Exceeded': '',
    'Throttle Limited': '',
    'Rate Limited': '',
    'Request Entity Too Large': '',
    'Endpoint Error': '',
    'Endpoint Timeout': '',
    'Unexpected Error': '',
    'unknown error': '',
    'io error': '',
  }

  return errorMessageMap[errorMessage] || defaultMessage || '알 수 없는 오류, 관리자에게 문의 부탁드립니다.'
}

export default naverErrorMessageParser
