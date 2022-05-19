import fakeHttp from '../fakeHttp'

const signIn = (userData) => fakeHttp.post('/auth/login', userData)

const signUp = (userData) => fakeHttp.post('/auth/signUp', userData)

export default {
  signIn,
  signUp,
}
