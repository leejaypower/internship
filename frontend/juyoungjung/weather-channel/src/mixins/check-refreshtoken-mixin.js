import { REFRESHTOKEN } from '@/constants/localStorage-types'

const checkRefreshTokenMixin = {
  methods: {
    $_isRefreshTokenSavedAtLocalStorage() {
      return !!localStorage.getItem(REFRESHTOKEN)
    },
  },
}

export default checkRefreshTokenMixin
