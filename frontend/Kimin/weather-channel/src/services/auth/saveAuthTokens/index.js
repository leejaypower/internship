const saveAuthTokens = (tokens) => {
  localStorage.setItem('accessToken', tokens.accessTokenEncoded)
  localStorage.setItem('refreshToken', tokens.refreshTokenEncoded)
}

export default saveAuthTokens
