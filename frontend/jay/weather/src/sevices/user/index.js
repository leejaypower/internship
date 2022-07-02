import axios from '@/util/api/fakeAxios'

async function checkUserId(userId) {
  if (!userId) {
    const error = new Error('검사할 아이디가 없습니다.')
    const errorObj = { error, errorCode: 400 }
    throw errorObj
  }
  const checkResult = await axios.get('/check', userId)
  return checkResult
}

async function tryRegister(newUser) {
  if (!newUser) {
    const error = new Error('가입할 사용자 정보가 없습니다.')
    const errorObj = { error, errorCode: 400 }
    throw errorObj
  }
  const registerResult = await axios.post('/register', newUser)
  return registerResult
}

async function matchPassword(checkData) {
  if (!checkData) {
    const error = new Error('비밀번호 정보가 없습니다.')
    const errorObj = { error, errorCode: 400 }
    throw errorObj
  }
  const matchResult = await axios.get('/match', checkData)
  return matchResult
}

async function modifyPassword(modifyData) {
  if (!modifyData) {
    const error = new Error('수정할 비밀번호가 없습니다.')
    const errorObj = { error, errorCode: 400 }
    throw errorObj
  }
  const modifyResult = await axios.put('/modify', modifyData)
  return modifyResult
}

export {
  checkUserId, tryRegister, matchPassword, modifyPassword,
}
