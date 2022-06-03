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

export default fetchSignIn
