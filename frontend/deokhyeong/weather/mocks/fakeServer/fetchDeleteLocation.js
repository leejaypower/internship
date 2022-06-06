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

  const deleteTargetIndex = targetUser.bookmarkLocations.findIndex(
    (bookmark) => bookmark.location === body.location,
  )
  if (deleteTargetIndex === -1) {
    const alreadyRemoveResponse = Promise.reject({
      status: 400,
      data: {
        message: '해당 위치는 이미 지워졌습니다.',
      },
    })
    return alreadyRemoveResponse
  }

  targetUser.bookmarkLocations.splice(deleteTargetIndex, 1)
  users[targetIndex] = targetUser
  localStorage.setItem('users', JSON.stringify(users))
  const successResponse = Promise.resolve({
    status: 200,
    data: {
      message: 'Success',
      bookmarkLocations: targetUser.bookmarkLocations,
    },
  })
  return successResponse
}

export default fetchAddLocation
