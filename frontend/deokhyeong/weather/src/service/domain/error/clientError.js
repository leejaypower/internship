/* eslint-disable no-param-reassign */
const clientErrorMessages = [
  '아이디 비밀번호를 확인해주세요',
  '이미 가입이 완료된 이메일입니다.',
]

const isClientError = (errorMessage) => clientErrorMessages.some(
  (message) => message === errorMessage,
)

const setClientError = (message, vue) => {
  if (isClientError(message)) {
    vue.clienwtErrorMessages = message
    vue.isSnackbarError = true
  }
}

export default {
  setClientError,
}
