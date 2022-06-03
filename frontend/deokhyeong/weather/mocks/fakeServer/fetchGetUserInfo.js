import utils from '@/utils'

const fetchGetUserInfo = (headers) => {
  const users = JSON.parse(localStorage.getItem('users'))
  const user = users.find((_user) => _user.accessToken === headers?.Authentication)

  if (!headers?.Authentication) {
    const errorResponse = Promise.reject({
      status: 401,
      data: {
        message: 'Unauthorized',
      },
    })
    return errorResponse
  }

  if (!user) {
    const notFoundResponse = Promise.reject({
      status: 404,
      data: {
        message: 'NotFound',
      },
    })
    return notFoundResponse
  }

  if (utils.isExpiredTime(user.expire)) {
    return Promise.reject({
      status: 401,
      data: {
        message: '토큰 만료',
      },
    })
  }

  if (utils.isExpiredTime(user.refreshExpire)) {
    return Promise.reject({
      status: 401,
      data: {
        message: '리프레시 만료',
      },
    })
  }

  const successResponse = Promise.resolve({
    status: 200,
    data: {
      method: 'get 요청, 리프레시 재로그인이랑 구별하려구 넣은 메세지 입니다',
      message: 'Success',
      ...user,
    },
  })
  return successResponse
}

export default fetchGetUserInfo
