/* eslint-disable no-param-reassign */

const viewErrorMessages = [
  '아이디 비밀번호를 확인해주세요',
]

const isViewError = (errorMessage) => viewErrorMessages.some((message) => message === errorMessage)

const setViewError = (message, vue) => {
  if (isViewError) {
    vue.viewErrorMessage = message
    vue.isViewError = true
  }
}

const useErrorHook = (message, vue) => {
  setViewError(message, vue)
}

export default useErrorHook
