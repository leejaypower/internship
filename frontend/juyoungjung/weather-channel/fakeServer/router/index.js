/* eslint-disable prefer-promise-reject-errors */
import makeJWT from '../services/JWT/makeJWT'
import isJWTValid from '../middleware/isJWTValid'
import saveUserInfoAtLocalStorage from '../services/saveUserInfoAtLocalStorage'
import makeReturn from '../services/makeReturn'
import getUserInfoList from '../services/getUserInfoList'
import checkDuplicatedInfo from '../services/checkDuplicatedInfo'
import { USER_INFO_EMAIL, USER_INFO_NICKNAME } from '../constant'

const getCheckRefreshToken = (req) => {
  const UserInfoList = getUserInfoList()
  const token = req.headers.Authorization.split(' ')[1]
  const verifyUserInfo = UserInfoList.filter(
    (user) => user.refreshToken === token,
  )

  const { createAccessToken } = makeJWT()
  const {
    accessToken: newAccessToken,
    accessTokenExpireTime: newAccessTokenExpireTime,
  } = createAccessToken()

  const { id } = verifyUserInfo[0]

  UserInfoList[id].accessToken = newAccessToken
  UserInfoList[id].accessTokenExpireTime = newAccessTokenExpireTime

  const {
    email, nickname, accessToken, accessTokenExpireTime,
  } = UserInfoList[id]

  saveUserInfoAtLocalStorage(UserInfoList)
  return makeReturn(200, {
    email,
    nickname,
    accessToken,
    accessTokenExpireTime,
  })
}

const postLogin = (req) => {
  const UserInfoList = getUserInfoList()

  const verifyUserInfo = UserInfoList.filter(
    (user) => user.email === req.body.email && user.password === req.body.password,
  )

  if (verifyUserInfo.length < 1) {
    return makeReturn(403, { code: 'Wrong email or password' })
  }

  const { createAccessToken, createRefreshToken } = makeJWT()
  const { accessToken, accessTokenExpireTime } = createAccessToken()
  const { refreshToken, refreshTokenExpireTime } = createRefreshToken()

  const {
    id, email, nickname, password,
  } = verifyUserInfo[0]

  const newUserInfo = {
    id,
    email,
    nickname,
    password,
    accessToken,
    accessTokenExpireTime,
    refreshToken,
    refreshTokenExpireTime,
  }

  UserInfoList[id] = newUserInfo
  saveUserInfoAtLocalStorage(UserInfoList)

  delete newUserInfo.password

  return makeReturn(200, { ...newUserInfo })
}

const postSignup = (req) => {
  const UserInfoList = getUserInfoList()

  const needCheckListKey = [USER_INFO_EMAIL, USER_INFO_NICKNAME]
  const duplicatedInfo = needCheckListKey.filter((key) => checkDuplicatedInfo(key, req.body[key]))

  if (duplicatedInfo.length > 0) {
    return makeReturn(403, { code: `Duplicated ${duplicatedInfo.join(', ')}` })
  }

  const newUser = {
    id: UserInfoList.length,
    email: req.body.email,
    nickname: req.body.nickname,
    password: req.body.password,
  }

  saveUserInfoAtLocalStorage([...UserInfoList, newUser])

  return makeReturn(200)
}

const patchNickname = (req) => {
  const UserInfoList = getUserInfoList()

  const isDuplicatedNickname = UserInfoList.some(
    (user) => user.nickname === req.body.newNickname,
  )

  if (isDuplicatedNickname) {
    return makeReturn(403, { code: 'Duplicated nickname' })
  }

  const userInfo = UserInfoList.filter(
    (user) => user.email === req.body.email,
  )

  const { id } = userInfo[0]
  UserInfoList[id].nickname = req.body.newNickname

  saveUserInfoAtLocalStorage(UserInfoList)

  return makeReturn(200, { nickname: UserInfoList[id].nickname })
}

const patchPassword = (req) => {
  const UserInfoList = getUserInfoList()
  const token = req.headers.Authorization.split(' ')[1]
  const verifyUserInfo = UserInfoList.filter(
    (user) => user.accessToken === token && user.password === req.body.oldPassword,
  )

  if (verifyUserInfo.length < 1) {
    return makeReturn(403, { code: 'Wrong password' })
  }

  const { id } = verifyUserInfo[0]
  UserInfoList[id].password = req.body.newPassword

  saveUserInfoAtLocalStorage(UserInfoList)

  return makeReturn(200)
}

const get = (param, req) => {
  let response = makeReturn(401, { code: 'Unauthorized request' })

  if (req.headers) {
    const checkAccessTokenResult = isJWTValid(req.headers.Authorization)

    if (checkAccessTokenResult) {
      if (param === '/check-refreshToken') {
        response = getCheckRefreshToken(req)
      }
    }
  }

  return response
}

const patch = (param, req) => {
  let response = makeReturn(401, { code: 'Unauthorized request' })

  if (req.headers) {
    const checkAccessTokenResult = isJWTValid(req.headers.Authorization)

    if (checkAccessTokenResult) {
      if (param === '/nickname') {
        response = patchNickname(req)
      }
      if (param === '/password') {
        response = patchPassword(req)
      }
    }
  }

  return response
}

const post = (param, req) => {
  let response = makeReturn(400, { code: 'Invalid request' })
  if (param === '/signup') {
    response = postSignup(req)
  }
  if (param === '/login') {
    response = postLogin(req)
  }
  return response
}

const router = {
  get,
  post,
  patch,
}

export default router
