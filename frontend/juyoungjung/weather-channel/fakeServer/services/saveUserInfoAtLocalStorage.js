const saveUserInfoAtLocalStorage = (userInfo) => {
  localStorage.setItem('UserInfoList', JSON.stringify(userInfo))
}
export default saveUserInfoAtLocalStorage
