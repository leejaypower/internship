import { makeJWT } from '../services'

const {
  createAccessToken, createRefreshToken,
} = makeJWT()
const { accessToken, accessTokenExpireTime } = createAccessToken()
const { refreshToken, refreshTokenExpireTime } = createRefreshToken()

const UserInfoList = [
  {
    id: 0,
    email: 'test@test.com',
    password: 'test',
    nickname: 'test',
    accessToken,
    accessTokenExpireTime,
    refreshToken,
    refreshTokenExpireTime,

  },
  {
    id: 1,
    email: 'test1@test.com',
    password: 'test',
    nickname: 'test1',
    accessToken,
    accessTokenExpireTime,
    refreshToken,
    refreshTokenExpireTime,
  },
]

const setUserInfoListAtLocalStorage = (list = UserInfoList) => {
  localStorage.setItem('UserInfoList', JSON.stringify(list))
}

export default setUserInfoListAtLocalStorage
