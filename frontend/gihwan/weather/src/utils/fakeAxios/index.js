import {
  login, IsIdDuplicateCheck, signup, changeUserName, changeUserPassword, deleteUser, notFound,
} from '../fakeServer'

const fakeAxios = {
  interceptor: {
    function: () => {},
    options: null,
  },
  setInterceptor(interceptor) {
    if (typeof interceptor === 'function') {
      this.interceptor.function = interceptor
    }
    if (typeof interceptor === 'object') {
      this.interceptor.options = interceptor
    }
  },
  post(url, data) {
    this.interceptor.function()
    const { options } = this.interceptor
    switch (url) {
      case 'auth/login':
        return login(data, options)
      case 'auth/idDuplicate':
        return IsIdDuplicateCheck(data, options)
      case 'auth/signup':
        return signup(data, options)

      default:
        return notFound()
    }
  },
  patch(url, data) {
    this.interceptor.function()
    const { options } = this.interceptor
    switch (url) {
      case 'user/name':
        return changeUserName(data, options)
      case 'user/password':
        return changeUserPassword(data, options)
      default:
        return notFound()
    }
  },
  delete(url) {
    this.interceptor.function()
    const { options } = this.interceptor
    if (url.includes('user/delete')) {
      const idx = url.substring(12)
      return deleteUser(idx, options)
    }
    return notFound()
  },
}

export default fakeAxios
