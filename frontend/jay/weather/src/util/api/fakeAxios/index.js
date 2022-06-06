import {
  loginManage, retryLogin, findDuplicateId, notFoundError, registerUser,
  matchPassword, modifyPassword,

} from '@/util/api/fakeServer'

let isRecovery = false

const fakeAxios = {
  preInterceptor: null,
  postInterceptor: null,

  setPreInterceptor(callback) {
    this.preInterceptor = callback
  },
  setPostInterceptor(callback) {
    this.postInterceptor = callback
  },

  async get(req, data) {
    if (req === '/check') {
      const response = await findDuplicateId(data)
      return response
    }

    if (req === '/match') {
      const response = await matchPassword(data)
      return response
    }
    return notFoundError()
  },

  async post(req, data) {
    if (req === '/login') {
      const header = this.preInterceptor()
      const response = await loginManage(data, header)
      if (isRecovery === false) {
        const result = this.postInterceptor({
          req, data, latestRequest: () => this.post(req, data),
        }, response)
        isRecovery = true
        return result
      }
      return response
    }
    if (req === '/refresh') {
      const header = this.preInterceptor()
      const response = await retryLogin(header)
      return response
    }
    if (req === '/register') {
      const response = await registerUser(data)
      return response
    }
    return notFoundError()
  },

  async put(req, data) {
    if (req === '/modify') {
      const response = await modifyPassword(data)
      return response
    }
    return notFoundError()
  },

}

export default fakeAxios
