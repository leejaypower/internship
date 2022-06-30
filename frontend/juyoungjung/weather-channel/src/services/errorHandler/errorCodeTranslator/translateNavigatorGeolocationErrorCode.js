import {
  PERMISSION_DENIED,
  POSITION_UNAVAILABLE,
  TIMEOUT,
} from '@/constants'

const translateNavigatorGeolocationErrorCode = (code) => {
  let message = ''

  switch (code) {
    case PERMISSION_DENIED:
      message = '사이트에 현재 위치에 접근할 수 있는 권한을 허용하지 않아 아를 확인하지 못합니다.'
      break

    case POSITION_UNAVAILABLE:
      message = '현재 위치는 확인이 불가능한 장소입니다.'
      break

    case TIMEOUT:
      message = '현재 위치를 가져오는 요청 중 시간이 초과되었습니다.'
      break

    default:
      message = '현재 위치를 가져오는 도중 알 수 없는 에러가 발생했습니다.'
  }

  return message
}

export default translateNavigatorGeolocationErrorCode
