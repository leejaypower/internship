/* eslint-disable prefer-promise-reject-errors */
const testUsers = [
  { email: 'test@barogo.com', password: '123456a' },
  { email: 'test@test.com', password: '123456a' },
]

const setLocalStorageUsers = (key = 'users', data = testUsers) => {
  localStorage.setItem(key, JSON.stringify(data))
}

const fetchSignIn = (body) => {
  const users = JSON.parse(localStorage.getItem('users'))
  const user = users.find(
    (_user) => _user.email === body.email && _user.password === body.password,
  )

  if (!user) {
    return Promise.reject(
      {
        status: 404,
        data: {
          message: '아이디 비밀번호를 확인해주세요',
        },
      },
    )
  }

  return Promise.resolve({
    status: 200,
    data: {
      info: 'header에 들어갈 토큰',
      token: 'abcdefg',
    },
  })
}

const fetchSignUp = (body = {}) => {
  const users = JSON.parse(localStorage.getItem('users'))
  const newUser = { email: body.email, password: body.password }

  localStorage.setItem('users', JSON.stringify([...users, newUser]))

  return Promise.resolve({
    status: 200,
    data: {
      message: 'success',
    },
  })
}

export default {
  setLocalStorageUsers,
  fetchSignIn,
  fetchSignUp,
}
