import auth from '@/service/domain/auth'
import utils from '@/utils'

const clearFetchObserver = (fetchObserver) => {
  const fetchObserverRef = fetchObserver
  fetchObserverRef.requestCount = 0
  fetchObserverRef.isTokenRefrshing = false
  fetchObserverRef.recoveryFetch = () => {}
}

const fetchRecovery = async (fetchObserver, { accessToken, refreshToken }) => {
  console.log('리커버리 시작')
  const fetchObserverRef = fetchObserver
  auth.setTokens({ accessToken, refreshToken })
  const response = await fetchObserverRef.recoveryFetch()
  console.log('리커버리 결과 =>', response)
  return response
}

const refreshSignIn = async (fetchObserver, store, latestRequest) => {
  const fetchObserverRef = fetchObserver
  fetchObserverRef.isTokenRefrshing = true
  fetchObserverRef.recoveryFetch = latestRequest
  const result = await utils.delay(store.dispatch('auth/refreshSignIn'), 4)
  fetchObserverRef.isTokenRefrshing = false
  return result
}

const countFetchRequest = (fetchObserver) => {
  const fetchObserverRef = fetchObserver
  fetchObserverRef.requestCount += 1
}

const isOverFetch = (fetchObserver) => {
  const fetchObserverRef = fetchObserver
  return fetchObserverRef.requestCount > 3
}

const fetchObserver = {
  requestCount: 0,
  isTokenRefrshing: false,
  recoveryFetch: () => {},
}
const responseFailInterceptor = async (error, _config, store, router) => {
  try {
    const { latestRequest } = _config
    if (error.status === 401) {
      if (error.data.message === '리프레시 만료') {
        localStorage.clear()
        router.go(0)
        return Promise.reject(error)
      }
      const { refreshToken } = auth.getTokens()
      if (!refreshToken) {
        router.go(0)
        return Promise.reject(error)
      }

      countFetchRequest(fetchObserver)
      if (isOverFetch(fetchObserver)) throw new Error('무의미한 요청이 3회를 넘어갔습니다.')
      if (!fetchObserver.isTokenRefrshing) {
        console.log('재로그인 시작')
        const { data } = await refreshSignIn(fetchObserver, store, latestRequest)
        const recoveryResponse = await fetchRecovery(fetchObserver, data)
        clearFetchObserver(fetchObserver)
        return recoveryResponse
      }
    }
    return Promise.reject(error)
  } catch (catchError) {
    return Promise.reject(catchError)
  }
}

export default responseFailInterceptor
