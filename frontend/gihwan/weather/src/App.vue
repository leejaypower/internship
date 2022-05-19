<template>
  <v-app>
    <v-app-bar
      v-if="!isAuth"
      app
      color="primary"
    >
      <v-btn
        v-if="isLogin"
        @click="logout"
      >
        로그아웃
      </v-btn>
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

export default {
  name: 'App',
  computed: {
    isLogin() {
      return this.$store.getters['user/isSuccess']
    },
    isAuth() {
      return this.$route.path.includes('auth')
    },
  },
  mounted() {
    const loginInfo = localStorage.getItem('loginInfo') || sessionStorage.getItem('loginInfo')
    if (loginInfo) {
      this.$store.dispatch('user/autoLogin', JSON.parse(loginInfo))
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logout')
      this.goLoginPage()
    },
    goLoginPage() {
      this.$router.push('/auth/login')
    },
  },
}
</script>
