async function fetchMyLocation() {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      const error = new Error('위치 정보를 지원하지 않는 브라우저 환경입니다.')
      Object.assign(error, { errorCode: 4 })
      throw error
    }
    navigator.geolocation.getCurrentPosition((position) => {
      resolve(position.coords)
    }, (error) => {
      reject(error)
    })
  })
}
export default fetchMyLocation
