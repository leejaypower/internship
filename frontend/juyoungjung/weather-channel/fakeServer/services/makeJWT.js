import dayjs from 'dayjs'

const makeJWT = () => {
  const now = dayjs()
  const currentMinute = now.get('minute')
  const currentDate = now.get('date')

  const createAccessToken = () => {
    const accessTokenExpireTime = now.set('minute', currentMinute + 3).format()
    const accessToken = `accessToken-${accessTokenExpireTime}`

    return { accessToken, accessTokenExpireTime }
  }

  const createRefreshToken = () => {
    const refreshTokenExpireTime = now.set('date', currentDate + 1).format()
    const refreshToken = `refreshToken-${refreshTokenExpireTime}`

    return { refreshToken, refreshTokenExpireTime }
  }

  return { createAccessToken, createRefreshToken }
}
export default makeJWT
