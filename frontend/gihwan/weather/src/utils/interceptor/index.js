import fakeAxios from '@/utils/fakeAxios'
import jwtDecode from 'jwt-decode'
import store from '@/store'

/**
 * 받은 토큰의 만료 기간을 확인하는 함수
 * @param {string} token 확인할 토큰
 * @returns 만료되었으면 true, 아니면 false
 */
const tokenExpCheck = (token) => {
  const { exp: accessExp } = jwtDecode(token)
  return new Date() > new Date(accessExp * 1000)
}

/**
 * 해당 이름의 localStorage, sessionStorage를 삭제하는 함수
 * @param {string} name 삭제할 storage 이름
 */
const clearStorageByName = (name) => {
  localStorage.removeItem(name)
  sessionStorage.removeItem(name)
}

const problemCheck = (accessToken, refreshToken) => {
  if (!accessToken && !refreshToken) {
    return 'pass'
  }
  if (!accessToken && refreshToken) {
    return 'accessTokenUpdate'
  }
  if (accessToken && !refreshToken) {
    return 'logout'
  }
  if (tokenExpCheck(accessToken)) {
    if (tokenExpCheck(refreshToken)) {
      return 'logout'
    }
    return 'accessTokenUpdate'
  }
  return 'pass'
}

const tokenCheck = () => {
  const accessToken = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
  const refreshToken = localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken')
  const problem = problemCheck(accessToken, refreshToken)

  const newAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYmFyb2dvIiwiaWF0IjoxNjUyNDI3MzI3LCJleHAiOjE2ODM5ODQ5Mjd9.EvidSw6VHaCTDxNPj0EkpJQERAx_vo8yBRzufawJo3M'

  switch (problem) {
    case 'accessTokenUpdate':
      if (localStorage.getItem('refreshToken')) {
        localStorage.setItem('accessToken', newAccessToken)
      } else {
        sessionStorage.setItem('accessToken', newAccessToken)
      }
      fakeAxios.setInterceptor({
        header: newAccessToken,
      })
      break
    case 'logout':
      clearStorageByName('accessToken')
      clearStorageByName('refreshToken')
      store.dispatch('user/logout')
      break
    default:
      fakeAxios.setInterceptor({
        header: accessToken,
      })
      break
  }
}

export default tokenCheck
