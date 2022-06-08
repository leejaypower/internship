<template>
  <v-app>
    <v-app-bar app>
      <v-container>
        <v-row
          justify="space-between"
          align="center"
        >
          <v-col class="d-flex">
            <router-link to="/weather">
              날씨
            </router-link>
            <div class="empty" />
            <router-link
              v-if="isLogin"
              to="/mypage"
            >
              마이페이지
            </router-link>
          </v-col>
          <v-col align="end">
            <v-btn
              v-if="isLogin"
              color="primary"
              :small="isMobile"
              @click="logout"
            >
              로그아웃
            </v-btn>
            <v-btn
              v-else
              color="primary"
              :small="isMobile"
              @click="goLoginPage"
            >
              로그인
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import tokenCheck from '@/utils/interceptor'
import logo from '@/assets/logo.png'
import fakeAxios from './utils/fakeAxios'

export default {
  name: 'App',
  data: () => ({
    logo,
  }),
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.mobile
    },
    isLogin() {
      return this.$store.getters['user/isLoginSuccess']
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
      this.$router.push({ name: 'login' })
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      const { path } = this.$route
      if (path.includes('mypage')) {
        this.$router.push({ name: 'weather' })
      }
    },
  },
}
</script>
<style scoped>
.empty {
  width: 15px;
}
</style>
