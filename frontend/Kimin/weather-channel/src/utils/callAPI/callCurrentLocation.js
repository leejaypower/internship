/**
 * 브라우저 api(gps활용) 호출 함수
 * @returns 현 위치에 대한 coordinate 좌표 {latitude, longitude) 리턴
 */
const callGeoLocation = () => new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(
    (position) => resolve(position.coords),
    (error) => reject(error),
  )
})

export default callGeoLocation
