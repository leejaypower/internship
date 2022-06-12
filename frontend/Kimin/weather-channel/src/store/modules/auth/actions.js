import fakeAxios from '@/services/fakeAxios'
import router from '@/router'

const logOut = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('myInfo')
  router.push('/')
}

const registerNewAccount = async ({ dispatch, commit }, signUpData) => {
  try {
    await fakeAxios.post('registerNewAccount', signUpData)
  } catch (error) {
    throw new Error(error.message)
  }
}

const investigateID = async ({ commit }, ID) => {
  try {
    const response = await fakeAxios.get('checkDuplicationForID', ID)
    const isDuplicated = response.body.result
    return isDuplicated
  } catch (error) {
    throw new Error(error.message)
  }
}

const saveAuthTokens = (tokens) => {
  localStorage.setItem('accessToken', tokens.accessTokenEncoded)
  localStorage.setItem('refreshToken', tokens.refreshTokenEncoded)
}

const getMyInfo = async ({ commit }) => {
  const { ID } = JSON.parse(localStorage.getItem('myInfo'))
  console.log(`${ID}의 서버정보 다운로드 시도`)
  try {
    const response = await fakeAxios.get('getUserInfo', ID)
    const myInfo = response.body.result
    commit('fetchMyInfo', myInfo)
    console.log('개인정보 확보완료')
  } catch (error) {
    throw new Error(error.message)
  }
}

const getTokens = async ({ commit }, account) => {
  try {
    const response = await fakeAxios.get('getTokens', account)
    const tokens = response.body.result
    saveAuthTokens(tokens)
  } catch (error) {
    logOut()
    throw new Error(error.message)
  }
}

const actions = {
  getMyInfo,
  getTokens,
  logOut,
  registerNewAccount,
  investigateID,
}

export default actions
