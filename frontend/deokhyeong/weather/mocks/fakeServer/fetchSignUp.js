import { v4 as uuidv4 } from 'uuid'

const fetchSignUp = (headers, body) => {
  // 조회단 localstorage Layer
  // Service Layer
  const users = JSON.parse(localStorage.getItem('users'))
  const isEmailOverLap = users.find((_user) => _user.email === body.email)

  if (isEmailOverLap) {
    const badRequestResponse = Promise.reject({
      status: 400,
      data: {
        message: '이메일 중복',
      },
    })
    return badRequestResponse
  }

  const newUserId = uuidv4()
  const newUser = {
    id: newUserId,
    email: body.email,
    password: body.password,
    level: 'special',
    expire: 9999999999999,
    refreshExpire: 9999999999999,
    bookmarkLocations: [],
    selectedLocation: null,
    accessToken: `${newUserId}_9999999999999`,
    refreshToken: `${newUserId}_9999999999999`,
  }

  // tranjection Layer DB에 요청
  localStorage.setItem('users', JSON.stringify([...users, newUser]))

  const successResponse = Promise.resolve({
    status: 200,
    data: {
      message: 'Success',
    },
  })

  return successResponse
}

export default fetchSignUp
