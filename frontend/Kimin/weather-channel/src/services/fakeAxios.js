import fakeServer from '@/services/fakeServer'
import { BAD_REQUEST_ERROR } from '@/constants'
// eslint-disable-next-line
import { authPreInterceptor, authPostInterceptor } from './auth/authInterceptor'

const fakeAxios = {
  preInterCeptor() {},
  postInterCeptor(error) {
    throw new Error(error.message)
  },
  header: {},

  setPreInterCeptor(callBack) { // 토큰을 실어보낸다.
    this.preInterCeptor = callBack
  },
  setPostInterCeptor(callBack) {
    this.postInterCeptor = callBack
  },

  async get(url, data) {
    try {
      if (url === 'getTokens') {
        this.header.request = {
          method: 'get',
          url: `${url}`,
        }
        const response = await fakeServer.getTokens(this.header, data)
        return JSON.parse(response)
      }

      if (url === 'checkDuplicationForID') {
        this.header.request = {
          method: 'get',
          url: `${url}`,
        }
        const response = await fakeServer.checkDuplicationForID(this.header, data)
        return JSON.parse(response)
      }

      if (url === 'getUserInfo') {
        this.header.request = {
          method: 'get',
          url: `${url}`,
        }
        this.header.auth = this.preInterCeptor()
        const response = await fakeServer.getMyInfo(this.header, data)
        return JSON.parse(response)
      }

      if (url === 'authRefresh') {
        this.header.request = {
          method: 'get',
          url: `${url}`,
        }
        const newTokens = await fakeServer.requestNewAccessToken(this.header, data)
        return newTokens
      }

      throw new Error(BAD_REQUEST_ERROR)
    } catch (error) {
      try {
        const recovery = await this.postInterCeptor(error.message)
        return recovery
      } catch (interceptorError) {
        console.log('리커버리 최종실패')
        throw new Error(interceptorError.message)
      }
    }
  },

  async post(url, data) {
    try {
      if (url === 'registerNewAccount') {
        this.header.request = {
          method: 'post',
          url: `${url}`,
        }
        const response = await fakeServer.registerNewAccount(this.header, data)
        return JSON.parse(response)
      }
      if (url === 'editUserInfo') {
        this.header.request = {
          method: 'post',
          url: `${url}`,
        }
        this.header.auth = this.preInterCeptor()
        const response = await fakeServer.editUserInfo(this.header, data)
        return JSON.parse(response)
      }
      throw new Error(BAD_REQUEST_ERROR)
    } catch (error) {
      try {
        const recovery = await this.postInterCeptor(error.message)
        return recovery
      } catch (interceptorError) {
        console.log('리커버리 최종실패')
        throw new Error(interceptorError.message)
      }
    }
  },
}

fakeAxios.setPreInterCeptor(authPreInterceptor)
fakeAxios.setPostInterCeptor(authPostInterceptor)

export default fakeAxios
