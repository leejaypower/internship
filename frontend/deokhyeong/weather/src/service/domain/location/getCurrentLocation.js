const success = (pos, resolve) => {
  const result = pos.coords
  return resolve(result)
}

const failMessageParser = (errCode) => {
  switch (errCode) {
    case 1:
      return '위치 정보를 제공을 거부하였습니다. 마이페이지를 참고해주세요.'
    default:
      return '알 수 없는 오류'
  }
}

const fail = (err, reject) => reject({
  errorCode: err.code,
  data: {
    message: failMessageParser(err.code),
  },
})

const getCurrentLocation = () => new Promise(
  (resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => success(pos, resolve),
      (err) => fail(err, reject),
    )
  },
)

export default getCurrentLocation
