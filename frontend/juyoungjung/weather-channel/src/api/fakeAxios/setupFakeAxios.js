import store from '@/store'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants'
import fakeAxios from '../../../fakeAxios'
import {
  setAccessTokenBeforeRequestSentCb,
  setRefreshTokenBeforeRequestSentCb,
  setErrorCb,
} from './interceptorCallback'

const requestInstance = (tokenType) => {
  let setBeforeRequestSentCb = setAccessTokenBeforeRequestSentCb

  if (tokenType === REFRESH_TOKEN) {
    setBeforeRequestSentCb = setRefreshTokenBeforeRequestSentCb
  }

  return fakeAxios.interceptor
    .request.use(setBeforeRequestSentCb, setErrorCb)
}

function setupFakeAxios(tokenType) {
  requestInstance(tokenType)

  fakeAxios.interceptor.response.use((response) => response, async (error) => {
    const originalRequest = error.config
    const { method, url, data } = originalRequest

    if (error.response.status === 401) {
      if (url === '/check-refreshToken') {
        return Promise.reject(error.response)
      }

      const refreshToken = localStorage.getItem(REFRESH_TOKEN)

      if (refreshToken) {
        await store.dispatch('user/renewalAccessTokenInfo')

        if (store.getters['user/accessToken']) {
          requestInstance(ACCESS_TOKEN)

          await fakeAxios[method](url, data)
        }

        return Promise.reject(error.response)
      }
    }

    return Promise.reject(error)
  })

  return fakeAxios
}

export default setupFakeAxios
