import utils from '@/utils'

const patchRepairUserInfo = (headers, body) => {
  const users = JSON.parse(localStorage.getItem('users'))
  const targetIndex = users.findIndex((_user) => _user.accessToken === headers?.Authentication)

  if (!headers?.Authentication) {
    const errorResponse = Promise.reject({
      status: 401,
      data: {
        message: 'Unauthorized',
      },
    })
    return errorResponse
  }

  if (targetIndex === -1) {
    const notFoundResponse = Promise.reject({
      status: 404,
      data: {
        message: 'NotFound',
      },
    })
    return notFoundResponse
  }

  const targetUser = users[targetIndex]
  if (utils.isExpiredTime(targetUser.expire)) {
    return Promise.reject({
      status: 401,
      data: {
        message: '토큰 만료',
      },
    })
  }

  const prevEmail = users[targetIndex].email
  const isSameEmailWithPrevEmail = prevEmail === body.email
  if (!isSameEmailWithPrevEmail) {
    const isEmailOverLap = users.find((_user) => _user.email === body.email)
    if (isEmailOverLap) {
      return Promise.reject({
        status: 400,
        data: {
          message: '이메일 중복',
        },
      })
    }
  }

  targetUser.email = body.email
  targetUser.password = body.newPassword
  users[targetIndex] = targetUser
  localStorage.setItem('users', JSON.stringify(users))
  return Promise.resolve({
    status: 200,
    data: {
      message: 'Success',
      ...targetUser,
      repairTag: Math.random(), // repairApi로 수정한 계정만 가짐
    },
  })
}

export default patchRepairUserInfo
