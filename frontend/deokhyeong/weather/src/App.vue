<template>
  <v-app>
    <v-snackbar
      v-model="isViewError"
      color="error"
      absolute
      top
      timeout="1000"
    >
      {{ viewErrorMessage }}
    </v-snackbar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import errorHooks from '@/hooks/errorHooks/index'
import localstorage from '../mocks/localstorage'

export default {
  name: 'App',
  data: () => ({
    isViewError: false,
    viewErrorMessage: '',
  }),
  created() {
    localstorage.setLocalStorageUsers()
  },
  errorCaptured(err) {
    errorHooks.useErrorHook(err.data.message, this)
    return false
  },
}
</script>

<style>
html {
  background: #dbdbdb;
}
#app {
  background: white;
  max-width: 600px;
  margin: 0 auto;
}
</style>
