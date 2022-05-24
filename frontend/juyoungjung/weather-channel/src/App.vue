<template>
  <v-app class="mx-auto overflow-hidden">
    <app-bar />
    <v-main class="mt-16 pa-10 d-flex justify-center">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import AppBar from '@/components/AppBar.vue'

export default {
  name: 'App',
  components: { AppBar },
  // created() {
  //   localStorage.setItem('email', 'test@test.com')
  //   localStorage.setItem('password', 'test')
  //   localStorage.setItem('nickname', 'test')
  // },
}
</script>
