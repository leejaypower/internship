import fakeAxios from '@/services/fakeAxios'

const logOut = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('myInfo')
}

const registerNewAccount = async (_, signUpData) => {
  try {
    await fakeAxios.post('registerNewAccount', signUpData)
  } catch (error) {
    throw new Error(error.message)
  }
}

const investigateID = async (_, ID) => {
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
  try {
    const response = await fakeAxios.get('getUserInfo', ID)
    const myInfo = response.body.result
    commit('userInfoStore/fetchMyInfo', myInfo, { root: true })
  } catch (error) {
    throw new Error(error.message)
  }
}

const getTokens = async (_, account) => {
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
