import utils from '@/utils'

const fetchRefreshSignIn = (headers) => {
  const users = JSON.parse(localStorage.getItem('users'))
  const targetIndex = users.findIndex(
    (_user) => _user.refreshToken === headers?.refresh,
  )

  if (targetIndex === -1) {
    const badRequestResponse = Promise.reject({
      status: 400,
      data: {
        message: 'BadRequest',
      },
    })
    return badRequestResponse
  }

  const targetUser = users[targetIndex]
  if (utils.isExpiredTime(targetUser.refreshExpire)) {
    const refreshExpiredResponse = Promise.reject({
      status: 401,
      data: {
        message: '리프레시 만료',
      },
    })
    return refreshExpiredResponse
  }

  const refreshUser = {
    ...targetUser,
    accessToken: `${targetUser.id}_9999999999999`,
    refreshToken: `${targetUser.id}_9999999999999`,
    expire: 9999999999999,
    refreshExpire: 9999999999999,
    tokenTag: Math.random(), // refresh토큰으로 새로 발급한 토큰만 가짐
  }
  users[targetIndex] = refreshUser
  localStorage.setItem('users', JSON.stringify(users))
  const successResponse = Promise.resolve({
    status: 200,
    data: {
      message: 'Success',
      ...refreshUser,
    },
  })
  return successResponse
}

export default fetchRefreshSignIn
