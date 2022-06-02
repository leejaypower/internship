import token from '@/constants/tokenNames'
import validations from './validations'

const setTokens = ({ accessToken, refreshToken }) => {
  localStorage.setItem(token.ACCESS_TOKEN, accessToken)
  localStorage.setItem(token.REFRESH_TOKEN, refreshToken)
}

const getTokens = () => ({
  accessToken: localStorage.getItem(token.ACCESS_TOKEN),
  refreshToken: localStorage.getItem(token.REFRESH_TOKEN),
})

export default {
  ...validations,
  setTokens,
  getTokens,
}
