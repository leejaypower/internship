import { ACCESSTOKEN, REFRESHTOKEN } from '@/constants/localStorage-types'
import fakeAxios from '../../fakeAxios'
import setupFakeAxios from './fakeAxios/setupFakeAxios'

const postSignup = async (data) => {
  try {
    const response = await fakeAxios.post('/signup', data)
    return response
  } catch (error) {
    return error
  }
}

const postLogin = async (data) => {
  try {
    const response = await fakeAxios.post('/login', data)
    return response
  } catch (error) {
    return error
  }
}

const getCheckRefreshToken = async () => {
  try {
    const response = await setupFakeAxios(REFRESHTOKEN).get('/check-refreshToken')

    return response
  } catch (error) {
    return error
  }
}

const patchUpdateNickname = async (data) => {
  try {
    const response = await setupFakeAxios(ACCESSTOKEN).patch('/nickname', data)
    return response
  } catch (error) {
    return error
  }
}

const patchUpdatePassword = async (data) => {
  try {
    const response = await setupFakeAxios(ACCESSTOKEN).patch('/password', data)
    return response
  } catch (error) {
    return error
  }
}

const userApi = {
  postSignup, postLogin, getCheckRefreshToken, patchUpdateNickname, patchUpdatePassword,
}

export default userApi
