import logInAxios from '../../fakeAxios'
import saveAuthTokens from '../saveAuthTokens'

const requestNewTokens = () => {
  const myRefreshToken = localStorage.getItem('refreshToken')
  return new Promise((resolve, reject) => {
    logInAxios.get.requestNewAccessToken(myRefreshToken)
      .then((newTokens) => {
        saveAuthTokens(newTokens)
        resolve(newTokens.accessTokenEncoded)
      })
      .catch(() => {
        reject()
      })
  })
}

export default requestNewTokens
