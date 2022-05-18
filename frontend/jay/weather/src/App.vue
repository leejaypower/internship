<template>
  <v-app id="inspire">
    <app-bar />
    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <user-area />
          <app-main />
          <today-clothes />
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from './views/layout/AppBar.vue'
import AppMain from './views/layout/AppMain.vue'
import UserArea from './views/layout/UserArea.vue'
import TodayClothes from './views/layout/TodayClothes.vue'

export default {
  components: {
    AppBar,
    AppMain,
    TodayClothes,
    UserArea,
  },
}
</script>
