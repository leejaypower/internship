import checkValidationCause from './checkValidationCause'
import makeApiResponseInfo from '../makeApiResponseInfo'

const makeCoordsValidationResponseInfo = (longitude) => {
  const cause = checkValidationCause(longitude)

  return makeApiResponseInfo(
    'warning',
    `현재 좌표 중 ${cause}값이 잘못된 것으로 확인되었습니다. 관리자에게 문의해주세요.`,
  )
}

export default makeCoordsValidationResponseInfo
