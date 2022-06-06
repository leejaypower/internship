const testUsers = [
  {
    id: 1,
    email: 'test@normal.com',
    password: '123456a',
    level: 'normal',
    expire: 9999999999999,
    refreshExpire: 9999999999999,
    bookmarkLocations: [],
    selectedLocation: null,
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
    bookmarkLocations: [
      {
        location: '서울특별시/강서구',
        lat: '37.56227',
        long: '126.81622',
      },
      {
        location: '경기도/가평군',
        lat: '37.8308',
        long: '127.51522',
      },
    ],
    selectedLocation: {
      location: '경기도/가평군',
      lat: '37.8308',
      long: '127.51522',
    },
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
    bookmarkLocations: [
      {
        location: '서울특별시/강서구',
        lat: '37.56227',
        long: '126.81622',
      },
      {
        location: '경기도/가평군',
        lat: '37.8308',
        long: '127.51522',
      },
      {
        location: '울산광역시/울주군',
        lat: '35.56233',
        long: '129.1269',

      },
      {
        location: '경기도/고양시',
        lat: '37.65639',
        long: '126.835',
      },
    ],
    selectedLocation: {
      location: '경기도/고양시',
      lat: '37.65639',
      long: '126.835',
    },
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
    bookmarkLocations: [],
    selectedLocation: null,
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
