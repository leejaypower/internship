/* eslint-disable class-methods-use-this */
import fakeServer from './fakeServer'

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
        response = await fakeServer.fetchGetUserInfo(this.config.headers)
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
        response = await fakeServer.fetchSignIn(this.config.headers, body)
      }
      if (endPoint === '/auth/sign-up') {
        response = await fakeServer.fetchSignUp(this.config.headers, body)
      }
      if (endPoint === '/auth/refresh') {
        response = await fakeServer.fetchRefreshSignIn(this.config.headers, body)
      }
      if (endPoint === '/auth/repair') {
        response = await fakeServer.patchRepairUserInfo(this.config.headers, body)
      }
      if (endPoint === '/auth/logout') {
        response = await fakeServer.fetchLogout(this.config.headers, body)
      }
      if (endPoint === '/location/add') {
        response = await fakeServer.fetchAddLocation(this.config.headers, body)
      }
      if (endPoint === '/location/delete') {
        response = await fakeServer.fetchDeleteLocation(this.config.headers, body)
      }
      if (endPoint === '/location/select') {
        response = await fakeServer.fetchSelectLocation(this.config.headers, body)
      }
      if (endPoint === '/location/init') {
        response = await fakeServer.fetchInitLocation(this.config.headers, body)
      }
      if (endPoint === '/errorLog') {
        response = await fakeServer.fetchErrorLog(this.config.headers, body)
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
