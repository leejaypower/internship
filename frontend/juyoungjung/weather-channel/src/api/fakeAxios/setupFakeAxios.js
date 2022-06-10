import store from '@/store'
import { ACCESSTOKEN, REFRESHTOKEN } from '@/constants/localStorage-types'
import fakeAxios from '../../../fakeAxios'
import {
  setAccessTokenBeforeRequestSentCb,
  setRefreshTokenBeforeRequestSentCb,
  setErrorCb,
} from './interceptorCallback'

const requestInstance = (tokenType) => {
  let setBeforeRequestSentCb = setAccessTokenBeforeRequestSentCb
  if (tokenType === REFRESHTOKEN) {
    setBeforeRequestSentCb = setRefreshTokenBeforeRequestSentCb
  }

  return fakeAxios.interceptor
    .request.use(setBeforeRequestSentCb, setErrorCb)
}

let beforeOriginalRequestUrl = ''

function setupFakeAxios(tokenType) {
  requestInstance(tokenType)

  fakeAxios.interceptor.response.use((response) => response, async (error) => {
    const originalRequest = error?.config
    const { method, url, data } = originalRequest

    if (error?.response.status === 401 && (url === '/check-refreshToken' || url === beforeOriginalRequestUrl)) {
      return Promise.reject(error.response)
    }

    const refreshToken = localStorage.getItem(REFRESHTOKEN)
    if (error?.response.status === 401 && !!refreshToken && !beforeOriginalRequestUrl) {
      await store.dispatch('user/renewalAccessTokenInfo')

      requestInstance(ACCESSTOKEN)
      const response = await fakeAxios[method](url, data)
      beforeOriginalRequestUrl = url

      return response
    }

    return Promise.reject(error)
  })

  return fakeAxios
}

export default setupFakeAxios
