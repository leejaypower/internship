<template>
  <v-app>
    <v-app-bar
      app
      dark
    />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { getOneCallApiData } from '@/api'

export default {
  name: 'App',
  data: () => ({

  }),
  mounted() {
    const pos = {
      lat: '34.80902964688691',
      lon: '141.00673176487695',
    }
    const exclude = ['minutely', 'alerts']
    getOneCallApiData(pos, exclude)
  },
}
</script>
