<template>
  <v-app class="app">
    <router-view />
    <snack-bar />
    <v-btn @click="expireAccess">
      엑세스토큰 만료
    </v-btn>
    <v-btn @click="expireRefresh">
      리프레시토큰 만료
    </v-btn>
  </v-app>
</template>

<script>
import SnackBar from '@/components/SnackBar.vue'
import { REFRESH_TOKEN_OLD, ACCESS_TOKEN_OLD } from '@/constants'

export default {
  name: 'App',
  components: {
    SnackBar,
  },
  methods: {
    expireAccess() {
      console.log('엑세스토큰만료')
      localStorage.setItem('accessToken', ACCESS_TOKEN_OLD)
    },
    expireRefresh() {
      console.log('리프레시토큰만료')
      localStorage.setItem('refreshToken', REFRESH_TOKEN_OLD)
    },
  },
}
</script>

<style scoped>
  #app{
    background-color: rgb(214, 222, 221);
  }
</style>
