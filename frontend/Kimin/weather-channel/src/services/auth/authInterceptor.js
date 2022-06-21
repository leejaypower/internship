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
    throw new Error(AUTH_ERROR())
  }
  if (errorCode === '401') {
    try{
      const newTokens = await fakeAxios.get('authRefresh', refreshToken)
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
