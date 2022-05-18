<template>
  <v-app>
    <v-app-bar
      v-if="!isAuth"
      app
      color="primary"
    />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  computed: {
    isAuth() {
      return this.$route.path.includes('auth')
    },
  },
  mounted() {
    localStorage.setItem('user', JSON.stringify([{ id: 'barogo', pw: 'barogo123', name: '관리자' }, { id: 'intern', pw: 'intern123', name: '코린이' }]))
    this.$router.push('/auth/login')
  },
}
</script>
