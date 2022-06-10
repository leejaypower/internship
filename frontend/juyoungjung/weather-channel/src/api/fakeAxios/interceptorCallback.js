import { REFRESHTOKEN } from '@/constants/localStorage-types'
import store from '../../store'

const setAccessTokenBeforeRequestSentCb = (config) => {
  const accessToken = store.getters['user/accessToken']

  const newConfig = {
    headers: {
      Authorization: '',
      Accept: '',
    },
  }

  newConfig.headers.Authorization = `Bearer ${accessToken}`

  if (!config.headers.Accept) {
    newConfig.headers.Accept = 'application/json'
  } else {
    newConfig.headers.Accept = config.headers.Accept
  }

  return newConfig
}

const setRefreshTokenBeforeRequestSentCb = (config) => {
  const refreshToken = localStorage.getItem(REFRESHTOKEN)

  const newConfig = {
    headers: {
      Authorization: '',
      Accept: '',
    },
  }

  newConfig.headers.Authorization = `Bearer ${refreshToken}`

  if (!config.headers.Accept) {
    newConfig.headers.Accept = 'application/json'
  } else {
    newConfig.headers.Accept = config.headers.Accept
  }

  return newConfig
}

const setErrorCb = () => {
  const error = {
    status: 400,
    data: {
      message: '서버에 요청을 보내는 도중 문제가 발생했습니다.',
    },
  }

  return Promise.reject(error)
}

export {
  setAccessTokenBeforeRequestSentCb,
  setRefreshTokenBeforeRequestSentCb,
  setErrorCb,
}
