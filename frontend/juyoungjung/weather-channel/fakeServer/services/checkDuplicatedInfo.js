import getUserInfoList from './getUserInfoList'

const checkDuplicatedInfo = (key, userInfo) => {
  const UserInfoList = getUserInfoList()

  return UserInfoList.some((user) => user[key] === userInfo)
}

export default checkDuplicatedInfo
