<template>
  <div>
    <v-container class="d-flex">
      <router-link to="edit">
        내 정보 수정
      </router-link>
      <div class="empty" />
      <router-link to="bookmark">
        북마크
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
