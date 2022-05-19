/* eslint-disable class-methods-use-this */
import localstorage from './localstorage'

class FakeAxios {
  constructor({ baseURL }) {
    this.baseURL = baseURL
  }

  get(endPoint) {
    this.fakeFetchMessage(endPoint, 'get')
  }

  post(endPoint, body = {}) {
    this.fakeFetchMessage(endPoint, 'post')

    if (endPoint === '/auth/login') {
      return localstorage.fetchSignIn(body)
    }
    if (endPoint === '/auth/sign-up') {
      return localstorage.fetchSignUp(body)
    }

    throw new Error('잘못된 endPoint를 입력하셨습니다.')
  }

  delete() {}

  patch() {}

  put() {}

  fakeFetchMessage(endPoint, method) {
    console.log(`method : ${method}, ${this.baseURL}${endPoint} 와 연결하는 중`)
  }
}

export default FakeAxios
