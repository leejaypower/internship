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

function setupFakeAxios(tokenType) {
  requestInstance(tokenType)

  fakeAxios.interceptor.response.use((response) => response, async (error) => {
    const originalRequest = error.config
    const { method, url, data } = originalRequest

    // 1. fakeServer에서 accessToken 또는 refreshToken 확인 시 만료되었다면 401에러가 반환되는데
    if (error.response.status === 401) {
      // 2. refreshToken가 만료되었다면
      if (url === '/check-refreshToken') {
        // 3. 바로 error.response를 반환해 로그아웃해서 localStorage에서 refreshToken을 삭제하기
        return Promise.reject(error.response)
      }

      // 4. refreshToken이 localStorage에 저장되어 있는 상황에서
      // api요청을 보냈을 때 accessToken가 만료되어 401에러가 발생한 상황이라면
      const refreshToken = localStorage.getItem(REFRESHTOKEN)
      if (refreshToken) {
        // 5. 새로운 accessToken 갱신하기
        await store.dispatch('user/renewalAccessTokenInfo')
        // 6. 이때 refreshToken이 만료된 상황이라면 3번으로 이동하게 될 것이고

        if (store.getters['user/accessToken']) {
          // 7. 6번이 아니라면 새로운 accessToken으로 401에러가 발생한 요청을 그대로 다시 서버로 보내기
          requestInstance(ACCESSTOKEN)
          await fakeAxios[method](url, data)
        }

        // 9.refreshToken이 만료된 상황이라면 갱신되지 않은 기존 요청의 error.response를 반환하기
        return Promise.reject(error.response)
      }
    }

    return null
  })

  return fakeAxios
}

export default setupFakeAxios
