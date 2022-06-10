import dayjs from 'dayjs'

function checkTokenExpireTime(key, userInfo) {
  const now = dayjs().format()

  if (now < userInfo[key]) {
    return true
  }
  return false
}
export default checkTokenExpireTime
