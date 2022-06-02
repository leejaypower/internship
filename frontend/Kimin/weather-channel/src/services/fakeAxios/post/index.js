import get from '../get'

const registerNewAccount = (ID, name, password) => {
  const signUpData = {}
  signUpData[`${ID}`] = {
    ID,
    name,
    password,
    avatarImgSrc: 'https://media.defense.gov/2020/Feb/19/2002251686/700/465/0/200219-A-QY194-002.JPG',
    address: '',
  }
  return new Promise((resolve) => {
    const storedAccountSets = JSON.parse(localStorage.getItem('userAccount(SERVER)'))
    const upDatedAccountSets = { ...storedAccountSets, ...signUpData }
    localStorage.setItem('userAccount(SERVER)', JSON.stringify(upDatedAccountSets))
    resolve()
  })
}

const editUserInfo = (accessToken, newInfo) => new Promise((resolve, reject) => {
  get.verifyToken(accessToken)
    .then(() => {
      const storedAccountSets = JSON.parse(localStorage.getItem('userAccount(SERVER)'))
      storedAccountSets[`${newInfo.ID}`] = newInfo
      localStorage.setItem('userAccount(SERVER)', JSON.stringify(storedAccountSets))
      resolve()
    })
    .catch(() => {
      reject()
    })
})

const post = {
  registerNewAccount, editUserInfo,
}

export default post
