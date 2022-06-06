const fetchSignIn = (headers, body) => {
  const users = JSON.parse(localStorage.getItem('users'))
  const user = users.find(
    (_user) => _user.email === body.email && _user.password === body.password,
  )

  if (!user) {
    const badRequestResponse = Promise.reject({
      status: 400,
      data: {
        message: 'BadRequest',
      },
    })

    return badRequestResponse
  }

  const successResponse = Promise.resolve({
    status: 200,
    data: {
      message: 'Success',
      ...user,
    },
  })

  return successResponse
}

export default fetchSignIn
