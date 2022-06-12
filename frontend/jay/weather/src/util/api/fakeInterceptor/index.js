import jwtDecode from 'jwt-decode'

const requestVerify = () => {
  const now = new Date()
  const currentMonth = now.getMonth() + 1
  const currentUnixTimeInMillisec = now.getTime()

  if (localStorage.getItem('testRefreshToken')) {
    const testAccessToken = JSON.parse(localStorage.getItem('testAccessToken'))
    const testRefreshToken = JSON.parse(localStorage.getItem('testRefreshToken'))
    if (testAccessToken) {
      if (testAccessToken.exp > currentUnixTimeInMillisec) {
        return testAccessToken
      }
      if (testAccessToken.exp < currentUnixTimeInMillisec) {
        return { testAccessToken, testRefreshToken }
      }
    }
  }

  if (localStorage.getItem('refresh-token')) {
    const accessToken = jwtDecode(localStorage.getItem('access-token'))
    const refreshToken = jwtDecode(localStorage.getItem('refresh-token'))
    if (accessToken && accessToken.exp > currentMonth) {
      return accessToken
    }
    if (refreshToken && refreshToken.exp > currentMonth) {
      return { accessToken, refreshToken }
    }
  }

  return 'no token'
}

const responseVerify = (originRequest, response, store) => {
  const now = new Date()
  const currentUnixTimeInMillisec = now.getTime()
  // 서버요청에 대한 recovery 구간
  // jwt 토큰의 경우 유효기간을 길게 설정해놓았기 때문에 test 토큰을 받았을 때 verify하는 로직을 넣었습니다.
  if (response.exp < currentUnixTimeInMillisec + 10000) {
    store.dispatch('authStore/refreshAction')
  }
  const result = originRequest.latestRequest()
  return result
}

export { requestVerify, responseVerify }
