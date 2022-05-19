import authApi from '@/service/api/auth'
import router from '@/router'

const signIn = async (context, { email, password }) => {
  const response = await authApi.signIn({ email, password })
  if (response.status === 200) {
    context.commit('setAuthData', {
      email: response.data.email,
      password: response.data.password,
      token: response.data.token,
    })
    router.push('/')
  }
}

export default {
  signIn,
}
