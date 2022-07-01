import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants'
import fakeAxios from '../../fakeAxios'
import setupFakeAxios from './fakeAxios/setupFakeAxios'

const postSignup = async (data) => {
  const response = await fakeAxios.post('/signup', data)

  return response
}

const postLogin = async (data) => {
  const response = await fakeAxios.post('/login', data)

  return response
}

const getCheckRefreshToken = async () => {
  const response = await setupFakeAxios(REFRESH_TOKEN).get('/check-refreshToken')

  return response
}

const patchUpdateNickname = async (data) => {
  const response = await setupFakeAxios(ACCESS_TOKEN).patch('/nickname', data)

  return response
}

const patchUpdatePassword = async (data) => {
  const response = await setupFakeAxios(ACCESS_TOKEN).patch('/password', data)

  return response
}

const userApi = {
  postSignup,
  postLogin,
  getCheckRefreshToken,
  patchUpdateNickname,
  patchUpdatePassword,
}

export default userApi
