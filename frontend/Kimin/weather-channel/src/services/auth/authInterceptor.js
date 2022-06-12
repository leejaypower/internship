/* eslint-disable */
import fakeAxios from "../fakeAxios"
import { AUTH_ERROR } from '@/constants'

const authPreInterceptor = () => {
  const accessToken = localStorage.getItem('accessToken')

  return accessToken
}

const authPostInterceptor = async (error) => {
  const originalRequest = JSON.parse(error).header.originalRequest
  const errorCode = JSON.parse(error).header.HTTPStatusCode
  
  const originalRequestMethod = originalRequest.header.request.method
  const originalRequestURL = originalRequest.header.request.url
  const refreshToken = localStorage.getItem('refreshToken')

  if(!refreshToken || originalRequestURL === 'authRefresh'){
    console.log('PostInterceptor, 2회차 refresh 반려')
    throw new Error(AUTH_ERROR())
  }
  if (errorCode === '401') {
    console.log('PostInterceptor, 토큰 리프레시 시도 start')
    try{
      const newTokens = await fakeAxios.get('authRefresh', refreshToken)
      console.log('리프레시 성공, 새토큰 발급완료')
      localStorage.setItem('accessToken', newTokens.accessTokenEncoded)
      localStorage.setItem('refreshToken', newTokens.refreshTokenEncoded)
      const recovery = await fakeAxios[originalRequestMethod](`${originalRequestURL}`, originalRequest.body)
      return recovery
    } catch(error) {
      throw new Error(error.message)
    }
    
  }
  throw new Error(error)
}

export {
  authPreInterceptor,
  authPostInterceptor,
}
