import { REFRESH_TOKEN } from '@/constants'

const checkRefreshTokenMixin = {
  methods: {
    isRefreshTokenSavedAtLocalStorageMixin() {
      return !!localStorage.getItem(REFRESH_TOKEN)
    },
  },
}

export default checkRefreshTokenMixin
