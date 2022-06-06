const fetchInitLocation = (headers) => {
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
  const isExpiredDate = (targetUser.expire - new Date().getTime()) < 0
  if (isExpiredDate) {
    const expiredResponse = Promise.reject({
      status: 401,
      data: {
        message: '토큰 만료',
      },
    })
    return expiredResponse
  }

  users[targetIndex] = {
    ...users[targetIndex],
    bookmarkLocations: [],
    selectedLocation: null,
  }
  localStorage.setItem('users', JSON.stringify(users))
  const successResponse = Promise.resolve({
    status: 200,
    data: {
      message: 'Success',
      ...users[targetIndex],
    },
  })
  return successResponse
}

export default fetchInitLocation
