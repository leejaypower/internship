const fetchAddLocation = (headers, body) => {
  const users = JSON.parse(localStorage.getItem('users'))
  const targetIndex = users.findIndex((_user) => _user.accessToken === headers?.Authentication)

  if (!body.location) {
    const errorResponse = Promise.reject({
      status: 400,
      data: {
        message: 'BadRequest',
      },
    })
    return errorResponse
  }

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

  const selectTargetIndex = targetUser.bookmarkLocations.findIndex(
    (bookmark) => bookmark.location === body.location,
  )
  if (selectTargetIndex === -1) {
    const notFoundLocationResponse = Promise.reject({
      status: 400,
      data: {
        message: '해당 위치는 존재하지 않습니다.',
      },
    })
    return notFoundLocationResponse
  }

  targetUser.selectedLocation = body
  users[targetIndex] = targetUser
  localStorage.setItem('users', JSON.stringify(users))
  const successResponse = Promise.resolve({
    status: 200,
    data: {
      message: 'Success',
      bookmarkLocations: targetUser.bookmarkLocations,
      selectedLocation: targetUser.selectedLocation,
    },
  })
  return successResponse
}

export default fetchAddLocation
