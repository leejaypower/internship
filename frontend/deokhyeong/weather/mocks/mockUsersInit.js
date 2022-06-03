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

const mockUsersInit = () => {
  const isExistedUsers = localStorage.getItem('users')
  if (!isExistedUsers) {
    localStorage.setItem('users', JSON.stringify(testUsers))
  }
}

export default mockUsersInit
