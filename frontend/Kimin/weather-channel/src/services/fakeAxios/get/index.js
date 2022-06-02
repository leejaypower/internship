import jwtDecode from 'jwt-decode'

const ACCESS_TOKEN_OLD = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOiIxNjUyODc0MTI0Mjg5IiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.1GFoDUdvNPip4A3mBYODldTjXRL3xc0bL2LQ3AGs_3c'
const ACCESS_TOKEN_NEW = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOiIxNjU0OTI2NjMxODY4IiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.X9frrKmyMLZyqXhlL_ysPRnI9h-EGCpWzgf3z6-ZFVQ'
const REFRESH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOiIxNjU1NTUyNjU0Mzk5IiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.41VTLXIhNXmAUuO9pEXAtNYOh9rmx1MC1_AIkgkBjE4'

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
const verifyToken = (usersToken) => new Promise((resolve, reject) => {
  const isValidToken = verifyTokenTruth(usersToken)
  if (!usersToken || !isValidToken) reject()
  const isExpired = checkTokensExpiration(usersToken)
  if (isExpired) {
    reject()
  } else {
    resolve()
  }
})

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
const requestNewAccessToken = (refreshToken) => new Promise((resolve, reject) => {
  verifyToken(refreshToken)
    .then(() => {
      const newTokens = {
        accessTokenEncoded: ACCESS_TOKEN_NEW,
        refreshTokenEncoded: REFRESH_TOKEN,
      }
      resolve(newTokens)
    })
    .catch(() => {
      reject()
    })
})

/**
 * 아이디 확인 후 토큰발급하는 서버역할을 구현(토큰기반인증방식 구현 학습목적으로 최초에는 일부러 expiredAccessToken을 발급합니다.)
 * @param {object} 오브젝트 id와 password로 구성
 * @returns {object} accessToken과 refreshToken의 객체
 */
const getTokens = ({ ID, password }) => {
  const account = { ID, password }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const successMatch = checkAccountTrue(account)
      if (!successMatch) reject(new Error())
      const tokens = {
        accessTokenEncoded: ACCESS_TOKEN_OLD,
        refreshTokenEncoded: REFRESH_TOKEN,
      }
      resolve(tokens)
    }, 1000)
  })
}

/**
 * 웹클라이언트가 유저정보를 요청
 * @param {string} ID
 * @returns {object} 개인정보set
 */
const getMyInfo = (ID) => new Promise((resolve) => {
  const userInfoDB = JSON.parse(localStorage.getItem('userAccount(SERVER)'))
  const myInfo = userInfoDB[`${ID}`]
  resolve(myInfo)
})

const isDuplicatedID = (ID) => {
  const userInfoDB = JSON.parse(localStorage.getItem('userAccount(SERVER)'))
  const isDuplicated = userInfoDB && userInfoDB[`${ID}`]
  return isDuplicated
}

const get = {
  getTokens,
  isDuplicatedID,
  requestNewAccessToken,
  getMyInfo,
  verifyToken,
}

export default get
