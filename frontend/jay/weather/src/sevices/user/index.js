import axios from '@/util/api/fakeAxios'

async function checkUserId(userId) {
  const checkResult = await axios.get('/check', userId)
  return checkResult
}

async function tryRegister(newUser) {
  const registerResult = await axios.post('/register', newUser)
  return registerResult
}

async function matchPassword(checkData) {
  const matchResult = await axios.get('/match', checkData)
  return matchResult
}

async function modifyPassword(modifyData) {
  const modifyResult = await axios.put('/modify', modifyData)
  return modifyResult
}

export {
  checkUserId, tryRegister, matchPassword, modifyPassword,
}
