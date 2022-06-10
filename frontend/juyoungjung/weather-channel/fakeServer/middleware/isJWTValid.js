import getUserInfoList from '../services/getUserInfoList'
import checkTokenExpireTime from './checkTokenExpireTime'
import { USER_INFO_ACCESSTOKEN, USER_INFO_REFRESHTOKEN } from '../constant'

const isJWTValid = (Authorization) => {
  const UserInfoList = getUserInfoList()
  const token = Authorization.split(' ')[1]

  const needCheckListKey = [USER_INFO_ACCESSTOKEN, USER_INFO_REFRESHTOKEN]

  let tokenInfoKey = ''
  const registeredUserInfo = UserInfoList.filter((user) => needCheckListKey
    .some((key) => {
      if (user[key] === token) {
        tokenInfoKey = key
        return true
      }
      return false
    }))

  return registeredUserInfo.length > 0 ? checkTokenExpireTime(`${tokenInfoKey}ExpireTime`, registeredUserInfo[0]) : false
}
export default isJWTValid
