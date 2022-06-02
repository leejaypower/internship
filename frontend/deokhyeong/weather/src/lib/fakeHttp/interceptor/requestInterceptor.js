import auth from '@/service/domain/auth'
import utils from '@/utils'
import decode from '../../../../mocks/fakeDecode'

const setTokenHeadersFromLocalStorage = (_config) => {
  const { accessToken, refreshToken } = auth.getTokens()
  const expire = decode(accessToken)
  const refreshExpire = decode(refreshToken)
  const config = utils.deepClone(_config)

  config.headers.Authentication = utils.isExpiredTime(expire) ? '' : accessToken
  config.headers.refresh = utils.isExpiredTime(refreshExpire) ? '' : refreshToken

  return config
}

const requestInterceptor = (interceptConfig, router) => {
  try {
    if (interceptConfig.endPoint === '/auth/login'
    || interceptConfig.endPoint === '/auth/sign-up') {
      return interceptConfig
    }
    const config = setTokenHeadersFromLocalStorage(interceptConfig)
    const { Authentication, refresh } = config.headers
    if (!Authentication && !refresh) {
      router.go(0)
      throw Error({ message: '토큰이 없습니다.' })
    }

    return Promise.resolve(config)
  } catch (err) {
    const error = { ...err, from: 'requestInterceptor' }
    return Promise.reject(error)
  }
}

export default requestInterceptor
