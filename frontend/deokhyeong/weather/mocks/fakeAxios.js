/* eslint-disable class-methods-use-this */
import localstorage from './localstorage'

class FakeAxios {
  constructor({ baseURL }) {
    this.baseURL = baseURL
    this.config = {
      headers: {},
    }
    this.requestInterceptor = null
    this.responseSuccessInterceptor = null
  }

  async get(endPoint) {
    try {
      const latestRequest = () => this.get(endPoint)
      this.config = await this.requestInterceptor(
        this.getConfig(endPoint, latestRequest),
      )

      console.log('get 요청=>', this.config)
      let response
      if (endPoint === '/auth/get-user') {
        response = await localstorage.fetchGetUserInfo(this.config.headers)
      }

      return response
    } catch (error) {
      if (error.from === 'requestInterceptor') {
        return Promise.reject(error)
      }

      const response = await this.responseFailInterceptor(error, this.config)
      console.log('리커버리 반환중')
      return response
    }
  }

  async post(endPoint, body) {
    try {
      const latestRequest = () => this.post(endPoint, body)
      this.config = await this.requestInterceptor(
        this.getConfig(endPoint, latestRequest),
      )

      let response
      if (endPoint === '/auth/login') {
        response = await localstorage.fetchSignIn(this.config.headers, body)
      }
      if (endPoint === '/auth/sign-up') {
        response = await localstorage.fetchSignUp(this.config.headers, body)
      }
      if (endPoint === '/auth/refresh') {
        response = await localstorage.fetchRefreshSignIn(this.config.headers, body)
      }
      if (endPoint === '/auth/repair') {
        response = await localstorage.fetchRepairUserInfo(this.config.headers, body)
      }
      if (endPoint === '/auth/logout') {
        response = await localstorage.fetchLogout(this.config.headers, body)
      }

      console.log('post 요청', this.config)
      return response
    } catch (error) {
      if (error.from === 'requestInterceptor') {
        return Promise.reject(error)
      }

      const response = await this.responseFailInterceptor(error, this.config)
      console.log('리커버리 반환중')
      return response
    }
  }

  delete() {}

  patch() {}

  put() {}

  getConfig(endPoint, latestRequest) {
    return {
      ...this.config,
      endPoint,
      latestRequest,
    }
  }

  setRequestInterceptor(callback) {
    this.requestInterceptor = (config) => callback(config)
  }

  setResponseInterceptor(callback) {
    this.responseFailInterceptor = (response, config) => callback(response, config)
  }
}

export default FakeAxios
