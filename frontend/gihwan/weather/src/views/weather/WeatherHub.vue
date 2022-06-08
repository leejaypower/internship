<template>
  <div>
    <v-container class="d-flex">
      <router-link to="current">
        현재 위치
      </router-link>
      <div class="empty" />
      <router-link to="location">
        지역별 날씨
      </router-link>
    </v-container>
    <router-view />
  </div>
</template>

<style scoped>
.empty {
  width: 15px;
}
</style>
