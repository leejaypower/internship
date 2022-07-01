function loginManage(loginData, header) {
  const today = new Date()
  const now = today.getMonth() + 1
  return new Promise((resolve, reject) => {
    const memberData = JSON.parse(localStorage.getItem('memberData'))
    const userInfo = memberData.find((item) => item.id === loginData.id)
    if (!userInfo || userInfo.password !== loginData.password) {
      reject(new Error('아이디나 비밀번호를 잘못 입력했습니다. 다시 확인해주세요.'))
    }

    if (header.tokenName === 'access-token' && header.exp > now) {
      const { name, id } = header
      resolve({ message: 'VALID_FAKE_ACCESS_TOKEN', data: { name, id } })
    }

    if (header.refreshToken) {
      if (header.refreshToken.exp > now) {
        const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOiIxMiIsImlkIjoiYWRtaW5AdGVzdC5jb20iLCJuYW1lIjoiYWNjZXNzIHRva2VuIOqwseyLoCIsInBhc3N3b3JkIjoicXdlcjEyMzQiLCJ0b2tlbk5hbWUiOiJhY2Nlc3MtdG9rZW4ifQ.Ia9ZzoIeX6WiwFQ-OA062FGhuX4cqif7xW3Zr1FsoHU'
        resolve({ message: 'VALID_REFRESH_TOKEN', data: { accessToken } })
      }
      if (header.refreshToken.exp < now) {
        localStorage.removeItem('access-token')
        localStorage.removeItem('refresh-token')
        reject(new Error('재로그인이 필요합니다.'))
      }
    }

    // admin 계정 로그인
    if (userInfo.id === 'admin@test.com' && header === 'no token') {
      const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOiIxMiIsImlkIjoiYWRtaW5AdGVzdC5jb20iLCJuYW1lIjoi6rSA66as7J6QIiwicGFzc3dvcmQiOiJxd2VyMTIzNCJ9.vQLXkjckNBB4VpDq-UAIgYCISInr0OWc1w8QtBWmZnE'
      const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOiIxMiIsImlkIjoiYWRtaW5AdGVzdC5jb20iLCJuYW1lIjoi6rSA66as7J6QIiwicGFzc3dvcmQiOiJxd2VyMTIzNCJ9.vQLXkjckNBB4VpDq-UAIgYCISInr0OWc1w8QtBWmZnE'
      resolve({ message: 'ADMIN_LOGIN', data: { accessToken, refreshToken } })
    }

    if (userInfo && header === 'no token') {
      const testAccessToken = {
        exp: today.getTime() + 10000,
        id: userInfo.id,
        name: userInfo.name,
        password: userInfo.password,
        tokenName: 'access-token',
      }
      const testRefreshToken = {
        exp: today.getTime() + 20000,
        id: userInfo.id,
        name: userInfo.name,
        password: userInfo.password,
        tokenName: 'refresh-token',
      }

      resolve({ message: 'ISSUE_VALID_FAKE_TOKEN', data: { testAccessToken, testRefreshToken } })
    }

    if (header.testRefreshToken) {
      if (header.testRefreshToken.exp > now) {
        const testAccessToken = {
          exp: today.getTime() + 10000,
          id: userInfo.id,
          name: userInfo.name,
          password: userInfo.password,
          tokenName: 'access-token',
        }
        localStorage.removeItem('testAccessToken')
        resolve({ message: 'VALID_FAKE_REFRESH_TOKEN', data: { testAccessToken } })
      }
      if (header.testRefreshToken.exp < now) {
        localStorage.removeItem('access-token')
        localStorage.removeItem('refresh-tokken')
        reject(new Error('재로그인이 필요합니다.'))
      }
    }
    const error = new Error('INVALID_PERMISSION_REQUEST')
    Object.assign(error, { errorCode: 401 })
    reject(error)
  })
}

function retryLogin(header) {
  const today = new Date()
  const now = today.getMonth() + 1
  const rightNow = today.getTime()
  return new Promise((resolve, reject) => {
    if (header.tokenName === 'access-token' && header.exp > now) {
      const { name, id, password } = header
      resolve({ message: 'VALID_FAKE_ACCESS_TOKEN', data: { name, id, password } })
    }

    if (header.accessToken && header.accessToken.exp > now) {
      const { name, id, password } = header.accessToken
      resolve({ message: 'VALID_ACCESS_TOKEN', data: { name, id, password } })
    }

    if (header.refreshToken) {
      if (header.refreshToken.exp > now) {
        localStorage.removeItem('access-token')
        const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOiIxMiIsImlkIjoiYWRtaW5AdGVzdC5jb20iLCJuYW1lIjoiYWNjZXNzIHRva2VuIOqwseyLoCIsInBhc3N3b3JkIjoicXdlcjEyMzQiLCJ0b2tlbk5hbWUiOiJhY2Nlc3MtdG9rZW4ifQ.Ia9ZzoIeX6WiwFQ-OA062FGhuX4cqif7xW3Zr1FsoHU'
        resolve({ message: 'VALID_REFRESH_TOKEN', data: { accessToken } })
      }
      if (header.refreshToken.exp < now) {
        localStorage.removeItem('access-token')
        localStorage.removeItem('refresh-tokken')
        reject(new Error('재로그인이 필요합니다.'))
      }
    }
    if (header.testRefreshToken) {
      if (header.testRefreshToken.exp > rightNow) {
        localStorage.removeItem('testAccessToken')
        const testAccessToken = {
          exp: today.getTime() + 10000,
          id: header.testRefreshToken.id,
          name: header.testRefreshToken.name,
          password: header.testRefreshToken.password,
          tokenName: 'access-token',
        }
        resolve({ message: 'VALID_FAKE_REFRESH_TOKEN', data: testAccessToken })
      }
      if (header.testRefreshToken.exp < rightNow) {
        localStorage.removeItem('testAccessToken')
        localStorage.removeItem('testRefreshToken')
        reject(new Error('재로그인이 필요합니다.'))
      }
    }
    // refresh 토큰 만료 테스트
    if (header === 'no token') {
      localStorage.removeItem('access-token')
      localStorage.removeItem('refresh-token')
      reject(new Error('재로그인이 필요합니다.'))
    }
    const error = new Error('INVALID_PERMISSION_REQUEST')
    Object.assign(error, { errorCode: 401 })
    reject(error)
  })
}

function findDuplicateId(id) {
  const memberData = JSON.parse(localStorage.getItem('memberData'))
  return new Promise((resolve, reject) => {
    if (!memberData) {
      resolve(id)
    }
    const isDuplicateId = memberData.some((item) => item.id === id)
    if (!isDuplicateId) {
      resolve(id)
    }
    if (isDuplicateId) {
      reject(new Error('이미 같은 아이디가 있습니다.'))
    }
    const error = new Error('INVALID_FAKE_SERVER_REQUEST')
    Object.assign(error, { errorCode: 404 })
    reject(error)
  })
}

function registerUser(newData) {
  const memberData = JSON.parse(localStorage.getItem('memberData'))
  return new Promise((resolve, reject) => {
    if (!memberData) {
      localStorage.setItem('memberData', JSON.stringify([newData]))
      resolve(newData)
      return
    }
    if (memberData) {
      const newUserData = [...memberData, newData]
      localStorage.setItem('memberData', JSON.stringify(newUserData))
      resolve(newData)
      return
    }
    const error = new Error('INVALID_FAKE_SERVER_REQUEST')
    Object.assign(error, { errorCode: 404 })
    reject(error)
  })
}

function matchPassword(checkData) {
  const memberData = JSON.parse(localStorage.getItem('memberData'))
  return new Promise((resolve, reject) => {
    const userInfo = memberData.find((item) => item.id === checkData.id)
    if (userInfo.password === checkData.password) {
      resolve(checkData.id)
      return
    }
    reject(new Error('입력한 비밀번호가 맞지 않습니다.'))
  })
}

function modifyPassword(userData) {
  return new Promise((resolve, reject) => {
    const memberData = JSON.parse(localStorage.getItem('memberData'))
    const userInfo = memberData.find((item) => item.id === userData.id)
    if (userInfo) {
      const userInfoIndex = memberData.findIndex((item) => item.id === userData.id)
      if (userInfoIndex !== -1) {
        localStorage.removeItem('memberData')
        userInfo.password = userData.changedPassword
        memberData.splice(userInfoIndex, 1)
        const modifyData = [...memberData, userInfo]
        localStorage.setItem('memberData', JSON.stringify(modifyData))
        resolve(userData.id)
      }
    }
    const error = new Error('INVALID_FAKE_SERVER_REQUEST')
    Object.assign(error, { errorCode: 404 })
    reject(error)
  })
}

function notFoundError() {
  return new Promise((resolve, reject) => {
    const error = new Error('INVALID_TEST_REQUEST')
    Object.assign(error, { errorCode: 1004 })
    reject(error)
  })
}

export {
  loginManage, retryLogin, findDuplicateId, notFoundError,
  registerUser, matchPassword, modifyPassword,
}
