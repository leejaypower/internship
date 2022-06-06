const fetchSignUp = (headers, body) => {
  const users = JSON.parse(localStorage.getItem('users'))
  const isEmailOverLap = users.find((_user) => _user.email === body.email)

  if (isEmailOverLap) {
    return Promise.reject({
      status: 400,
      data: {
        message: '이메일 중복',
      },
    })
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

export default fetchSignUp