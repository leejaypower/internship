import {
  REFRESH_TOKEN, ACCESS_TOKEN_NEW, AUTH_ERROR, SERVER_ERROR, SUCCESS_RESPONSE,
} from '@/constants'
import jwtDecode from 'jwt-decode'

const saveLogs = (header, logs) => {
  const server = JSON.parse(localStorage.getItem('savedLogs(SERVER)'))
  let updatedLogs
  if (server) {
    updatedLogs = JSON.stringify([...server, ...logs])
  } else {
    updatedLogs = JSON.stringify([...logs])
  }

  localStorage.setItem('savedLogs(SERVER)', updatedLogs)
  return SUCCESS_RESPONSE()
}

const findAccount = (header, accountInformation) => {
  try {
    const server = JSON.parse(localStorage.getItem('userAccount(SERVER)'))
    const serverAccounts = Object.entries(server)

    const correctAccount = serverAccounts.find((account) => {
      const isCorrectPhoneNumber = account[1].phoneNumber === accountInformation.phoneNumber
      const isCorrectName = account[1].name === accountInformation.name
      return isCorrectPhoneNumber && isCorrectName
    })
    if (correctAccount) {
      const foundedID = correctAccount[0]
      return SUCCESS_RESPONSE(foundedID)
    }
    return SUCCESS_RESPONSE()
  } catch (error) {
    throw new Error(SERVER_ERROR)
  }
}

const checkTokensExpiration = (usersToken) => {
  const expirationTime = Number(jwtDecode(usersToken).exp)
  const isExpired = expirationTime < new Date().getTime()
  if (isExpired) {
    return true
  }
  return false
}

const verifyTokenTruth = () => true

/**
 * 엑세스토큰의 유효성 검사(신뢰성 및 만료여부)
 * @param {string} usersToken
 * @returns {boolean} 토큰 유효여부
 */
const verifyToken = async (usersToken) => {
  try {
    const isValidToken = verifyTokenTruth(usersToken)
    if (!usersToken || !isValidToken) {
      throw new Error(AUTH_ERROR)
    }
    const isExpired = checkTokensExpiration(usersToken)
    if (isExpired) {
      throw new Error(AUTH_ERROR())
    }
  } catch (error) {
    if (JSON.parse(error.message).header.HTTPStatusCode === '401') {
      throw new Error(AUTH_ERROR())
    } else {
      throw new Error(SERVER_ERROR)
    }
  }
}

/**
 * 로그인 정보를 받아 서버기록과 대조하여 boolean 리턴
 * @param {object} account
 * @returns {boolean} 사용자 계정의 인증 여부
 */
const checkAccountTrue = (account) => {
  const [inputID, inputPW] = [account.ID, account.password]
  const storedAccountSets = JSON.parse(localStorage.getItem('userAccount(SERVER)'))
  if (!storedAccountSets || !storedAccountSets[`${inputID}`] || storedAccountSets[`${inputID}`].password !== inputPW) {
    return false
  }
  return true
}

/**
 * accessToken기한이 만료됐을 때 호출하는 recover API
 * @param {string} refreshToken
 * @returns {object} new token set
 */
const requestNewAccessToken = async (header, refreshToken) => {
  const originalRequest = {
    header,
    body: refreshToken,
  }
  try {
    await verifyToken(refreshToken)
    const newTokens = {
      accessTokenEncoded: ACCESS_TOKEN_NEW,
      refreshTokenEncoded: REFRESH_TOKEN,
    }
    return newTokens
  } catch (error) {
    throw new Error(AUTH_ERROR(originalRequest))
  }
}

/**
 * 아이디 확인 후 토큰발급하는 서버역할을 구현(토큰기반인증방식 구현 학습목적으로 최초에는 일부러 expiredAccessToken을 발급합니다.)
 * @param {object} 오브젝트 id와 password로 구성
 * @returns {object} accessToken과 refreshToken의 객체
 */
const getTokens = async (header, account) => {
  const originalRequest = {
    header,
    body: account,
  }
  try {
    const successMatch = await checkAccountTrue(account)
    if (!successMatch) {
      throw new Error(AUTH_ERROR(originalRequest))
    }

    const tokens = {
      accessTokenEncoded: ACCESS_TOKEN_NEW,
      refreshTokenEncoded: REFRESH_TOKEN,
    }
    return SUCCESS_RESPONSE(tokens)
  } catch (error) {
    if (JSON.parse(error.message).header.HTTPStatusCode === '401') {
      throw new Error(AUTH_ERROR(originalRequest))
    } else {
      throw new Error(SERVER_ERROR(originalRequest))
    }
  }
}

/**
 * 웹클라이언트가 유저정보를 요청
 * @param {string} ID
 * @returns {object} 개인정보set
 */
const getMyInfo = async (header, ID) => {
  const originalRequest = {
    header,
    body: ID,
  }
  try {
    await verifyToken(header.auth)
    const userInfoDB = JSON.parse(localStorage.getItem('userAccount(SERVER)'))
    const userInfo = userInfoDB?.[ID]
    return SUCCESS_RESPONSE(userInfo)
  } catch (error) {
    const errorCode = JSON.parse(error.message).header.HTTPStatusCode
    if (errorCode === '401') {
      throw new Error(AUTH_ERROR(originalRequest))
    }
    throw new Error(SERVER_ERROR(originalRequest))
  }
}

const checkDuplicationForID = (header, ID) => {
  try {
    const userInfoDB = JSON.parse(localStorage.getItem('userAccount(SERVER)'))
    const isDuplicated = !!userInfoDB?.[ID]
    return SUCCESS_RESPONSE(isDuplicated)
  } catch (error) {
    throw new Error(SERVER_ERROR)
  }
}

const registerNewAccount = async (header, signUpInformation) => {
  const { ID } = signUpInformation
  try {
    const signUpData = {}
    signUpData[`${ID}`] = {
      ...signUpInformation,
      avatarImgSrc: 'https://media.defense.gov/2020/Feb/19/2002251686/700/465/0/200219-A-QY194-002.JPG',
      address: '',
    }

    const storedAccountSets = JSON.parse(localStorage.getItem('userAccount(SERVER)'))
    const upDatedAccountSets = { ...storedAccountSets, ...signUpData }
    localStorage.setItem('userAccount(SERVER)', JSON.stringify(upDatedAccountSets))
    return SUCCESS_RESPONSE('Successfully Finished')
  } catch (error) {
    throw new Error(SERVER_ERROR)
  }
}

const editUserInfo = async (header, newInfo) => {
  const originalRequest = {
    header,
    body: newInfo,
  }
  try {
    await verifyToken(header.auth)
    const storedAccountSets = JSON.parse(localStorage.getItem('userAccount(SERVER)'))
    storedAccountSets[`${newInfo.ID}`] = newInfo
    localStorage.setItem('userAccount(SERVER)', JSON.stringify(storedAccountSets))
    return SUCCESS_RESPONSE('Successfully Finished')
  } catch (error) {
    const errorCode = JSON.parse(error.message).header.HTTPStatusCode
    if (errorCode === '401') {
      throw new Error(AUTH_ERROR(originalRequest))
    }
    throw new Error(SERVER_ERROR(originalRequest))
  }
}

const fakeServer = {
  getTokens,
  checkDuplicationForID,
  requestNewAccessToken,
  getMyInfo,
  verifyToken,
  registerNewAccount,
  editUserInfo,
  findAccount,
  saveLogs,
}

export default fakeServer
