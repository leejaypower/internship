async function fetchMyLocation() {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error('위치 정보를 지원하지 않는 브라우저 환경입니다.'))
    }
    navigator.geolocation.getCurrentPosition((position) => {
      resolve(position.coords)
    }, (error) => {
      reject(new Error(error.message))
    })
  })
}
export default fetchMyLocation
