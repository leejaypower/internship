import fakeHttp from '../fakeHttp'

const signIn = (userData) => fakeHttp.post('/auth/login', userData)

const signUp = (userData) => fakeHttp.post('/auth/sign-up', userData)

export default {
  signIn,
  signUp,
}
