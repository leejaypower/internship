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
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import error from '@/service/domain/error'
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
  errorCaptured(err) {
    error.setClientError(err.data.message, this)
    return false
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
