import { errorMap } from '../mapping'

/**
 * window.navigator.geolocation를 이용하여 현재 위치 가져오기
 */
const getCurrentLocation = () => new Promise((resolve, reject) => {
  const geolocationAPI = navigator.geolocation
  if (!geolocationAPI) {
    reject(new Error('위치 지원을 하지 않는 브라우저 입니다.'))
  }
  geolocationAPI.getCurrentPosition(({ coords }) => {
    resolve({ lat: coords.latitude, lon: coords.longitude })
  }, ({ code, message }) => {
    const newError = { code, message, errorMessage: errorMap.geolocationErrorMap(message) }
    reject(newError)
  })
})

export default getCurrentLocation
