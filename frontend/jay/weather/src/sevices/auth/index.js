import axios from '@/util/api/fakeAxios'
import jwtDecode from 'jwt-decode'

async function tryLogin(loginUser) {
  if (!loginUser.id || !loginUser.password) {
    const error = new Error('로그인을 시도할 정보가 없습니다.')
    const errorObj = { error, errorCode: 500 }
    throw errorObj
  }
  const loginResult = await axios.post('/login', loginUser)
  return loginResult
}

async function refreshLogin() {
  const loginResult = await axios.post('/refresh')
  return loginResult
}

async function sendFailedRequest() {
  const notfoundResult = await axios.post('/wrong')
  return notfoundResult
}

const today = new Date()
const now = today.getMonth() + 1
const rightNow = today.getTime()

const requestVerify = () => {
  if (localStorage.getItem('testRefreshToken')) {
    const testAccessToken = JSON.parse(localStorage.getItem('testAccessToken'))
    const testRefreshToken = JSON.parse(localStorage.getItem('testRefreshToken'))
    if (testAccessToken) {
      if (testAccessToken.exp > rightNow) {
        return testAccessToken
      }
      if (testAccessToken.exp < rightNow) {
        return { testAccessToken, testRefreshToken }
      }
    }
  }

  if (localStorage.getItem('refresh-token')) {
    const accessToken = jwtDecode(localStorage.getItem('access-token'))
    const refreshToken = jwtDecode(localStorage.getItem('refresh-token'))
    if (accessToken && accessToken.exp > now) {
      return { accessToken }
    }
    if (refreshToken && refreshToken.exp > now) {
      return { accessToken, refreshToken }
    }
  }

  return 'no token'
}

const responseVerify = (originRequest, response, store) => {
  // 서버요청에 대한 recovery 구간
  // jwt 토큰의 경우 유효기간을 길게 설정해놓았기 때문에 test 토큰을 받았을 때 verify하는 로직을 넣었습니다.
  if (response.exp < rightNow + 10000) {
    store.dispatch('authStore/refresh')
  }
  const result = originRequest.latestRequest()
  return result
}

export {
  tryLogin, refreshLogin, requestVerify, responseVerify, sendFailedRequest,
}
