/* eslint-disable prefer-promise-reject-errors */
const testUsers = [
  {
    id: 1,
    email: 'test@normal.com',
    password: '123456a',
    level: 'normal',
    expire: 9999999999999,
    refreshExpire: 9999999999999,
    accessToken: '1_9999999999999',
    refreshToken: '1_9999999999999',
  },
  {
    id: 2,
    email: 'test@special.com',
    password: '123456a',
    level: 'special',
    expire: 9999999999999,
    refreshExpire: 9999999999999,
    accessToken: '2_9999999999999',
    refreshToken: '2_9999999999999',
  },
  {
    id: 3,
    email: 'test@expired.com',
    password: '123456a',
    level: 'special',
    expire: 1,
    refreshExpire: 9999999999999,
    accessToken: '3_1',
    refreshToken: '3_9999999999999',
  },
  {
    id: 4,
    email: 'test@refreshexpired.com',
    password: '123456a',
    level: 'special',
    expire: 9999999999999,
    refreshExpire: 1,
    accessToken: '4_9999999999999',
    refreshToken: '4_1',
  },
]

const setLocalStorageUsers = (key = 'users', data = testUsers) => {
  localStorage.setItem(key, JSON.stringify(data))
}

const fetchSignIn = (headers, body) => {
  const users = JSON.parse(localStorage.getItem('users'))
  const user = users.find(
    (_user) => _user.email === body.email && _user.password === body.password,
  )

  if (!user) {
    return Promise.reject({
      status: 400,
      data: {
        message: 'BadRequest',
      },
    })
  }

  return Promise.resolve({
    status: 200,
    data: {
      message: 'Success',
      ...user,
    },
  })
}

const fetchSignUp = (headers, body) => {
  const users = JSON.parse(localStorage.getItem('users'))
  const user = users.find((_user) => _user.email === body.email)

  if (user) {
    return {
      status: 400,
      data: {
        message: 'BadRequest',
      },
    }
  }

  const newUser = {
    id: 5,
    email: body.email,
    password: body.password,
    level: 'special',
    expire: 9999999999999,
    refreshExpire: 9999999999999,
    accessToken: '5_9999999999999',
    refreshToken: '5_9999999999999',
  }
  localStorage.setItem('users', JSON.stringify([...users, newUser]))

  return Promise.resolve({
    status: 200,
    data: {
      message: 'Success',
    },
  })
}

const fetchRefreshSignIn = (headers) => {
  const users = JSON.parse(localStorage.getItem('users'))
  const targetIndex = users.findIndex(
    (_user) => _user.refreshToken === headers?.refresh,
  )

  if (targetIndex === -1) {
    return Promise.reject({
      status: 400,
      data: {
        message: 'BadRequest',
      },
    })
  }

  const targetUser = users[targetIndex]
  const isRefreshExpired = targetUser.refreshExpire - new Date().getTime() < 0
  if (isRefreshExpired) {
    return Promise.reject({
      status: 401,
      data: {
        message: '리프레시 만료',
      },
    })
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
  return Promise.resolve({
    status: 200,
    data: {
      message: 'Success',
      ...refreshUser,
    },
  })
}

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

  const isExpiredDate = (user.expire - new Date().getTime()) < 0
  if (isExpiredDate) {
    return Promise.reject({
      status: 401,
      data: {
        message: '토큰 만료',
      },
    })
  }

  const isRefreshExpireDate = (user.refreshExpire - new Date().getTime()) < 0
  if (isRefreshExpireDate) {
    return Promise.reject({
      status: 401,
      data: {
        message: '리프레시 만료',
      },
    })
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

  const successResponse = Promise.resolve({
    status: 200,
    data: {
      method: 'get 요청, 리프레시 재로그인이랑 구별하려구 넣은 메세지 입니다',
      message: 'Success',
      user,
    },
  })
  return successResponse
}

const fetchRepairUserInfo = (headers, body) => {
  const users = JSON.parse(localStorage.getItem('users'))

  if (!headers?.Authentication) {
    const errorResponse = Promise.reject({
      status: 401,
      data: {
        message: 'Unauthorized',
      },
    })
    return errorResponse
  }

  const user = users.find((_user) => _user.accessToken === headers?.Authentication)
  if (!user) {
    const notFoundResponse = Promise.reject({
      status: 404,
      data: {
        message: 'NotFound',
      },
    })
    return notFoundResponse
  }

  const isExpiredDate = (user.expire - new Date().getTime()) < 0
  if (isExpiredDate) {
    return Promise.reject({
      status: 401,
      data: {
        message: '토큰 만료',
      },
    })
  }

  user.email = body.email
  user.password = body.newPassword
  return Promise.resolve({
    status: 200,
    data: {
      message: 'Success',
      ...user,
      tokenTag: Math.random(), // refresh토큰으로 새로 발급한 토큰만 가짐
    },
  })
}

const fetchLogout = () => Promise.resolve({
  status: 200,
  data: {
    message: 'Success',
  },
})

export default {
  setLocalStorageUsers,
  fetchSignIn,
  fetchSignUp,
  fetchRefreshSignIn,
  fetchGetUserInfo,
  fetchRepairUserInfo,
  fetchLogout,
}
