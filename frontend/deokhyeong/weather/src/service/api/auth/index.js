import fakeHttp from '@/lib/fakeHttp'

const signIn = (userData) => fakeHttp.post('/auth/login', userData)

const signUp = (userData) => fakeHttp.post('/auth/sign-up', userData)

const refreshSignIn = () => fakeHttp.post('/auth/refresh')

const getUserInfo = () => fakeHttp.get('/auth/get-user')

const repairUserInfo = (userData) => fakeHttp.post('/auth/repair', userData)

const logout = () => fakeHttp.post('/auth/logout')

export default {
  signIn,
  signUp,
  refreshSignIn,
  getUserInfo,
  repairUserInfo,
  logout,
}
