<template>
  <v-app>
    <v-app-bar
      v-if="!isAuth"
      app
      color="primary"
    >
      <template v-if="isLogin">
        <router-link to="/auth">
          <v-btn @click="logout">
            로그아웃
          </v-btn>
        </router-link>
        <router-link to="/user">
          <v-btn>
            내 정보 수정
          </v-btn>
        </router-link>
      </template>
      <v-btn
        v-else
        @click="goLoginPage"
      >
        로그인
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import tokenCheck from '@/utils/interceptor'
import fakeAxios from './utils/fakeAxios'

export default {
  name: 'App',
  computed: {
    isLogin() {
      return this.$store.getters['user/isLoginSuccess']
    },
    isAuth() {
      return this.$route.path.includes('auth')
    },
  },
  async mounted() {
    const loginInfo = localStorage.getItem('loginInfo') || sessionStorage.getItem('loginInfo')
    if (loginInfo) {
      await this.$store.dispatch('user/autoLogin', JSON.parse(loginInfo))
    }
    fakeAxios.setInterceptor(tokenCheck)
  },
  methods: {
    goLoginPage() {
      this.$router.push('/auth/login')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
    },
  },
}
</script>
