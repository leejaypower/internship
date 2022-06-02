<template>
  <v-app id="inspire">
    <app-bar />
    <v-main class="grey lighten-3">
      <v-container>
        <alert-message />
        <v-row justify="center">
          <user-area />
          <app-main />
          <today-clothes />
        </v-row>
      </v-container>
    </v-main>
    <confirm-sheet />
  </v-app>
</template>

<script>
import AppBar from '@/views/layout/AppBar.vue'
import AppMain from '@/views/layout/AppMain.vue'
import UserArea from '@/views/layout/UserArea.vue'
import TodayClothes from '@/views/layout/TodayClothes.vue'
import AlertMessage from '@/components/AlertMessage.vue'
import ConfirmSheet from '@/components/ConfirmSheet.vue'

export default {
  components: {
    AppBar,
    AppMain,
    TodayClothes,
    UserArea,
    AlertMessage,
    ConfirmSheet,
  },
}
</script>

<style scoped>
.container{
max-width: 1264px;
}
</style>
