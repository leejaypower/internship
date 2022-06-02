<template>
  <v-app>
    <v-snackbar
      v-model="isSnackbarError"
      color="error"
      absolute
      top
      timeout="1000"
    >
      {{ clientErrorMessages }}
    </v-snackbar>
    <v-btn @click="testSubmit">
      비동기 테스트
    </v-btn>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import auth from '@/service/api/auth'
import localstorage from '../mocks/localstorage'

export default {
  name: 'App',
  data: () => ({
    isSnackbarError: false,
    clientErrorMessages: '',
  }),
  created() {
    localstorage.setLocalStorageUsers()
  },
  methods: {
    testSubmit() {
      auth.getUserInfo()
        .then((res) => console.log('성공부', res))
        .catch((err) => console.log('에러부', err))
    },
  },
}
</script>

<style>
#app {
  background: #dbdbdb;
}

#app .v-main {
  width: 600px;
  margin: 0 auto;
  background: white;
  display: flex;
  justify-content: center;
}
</style>
