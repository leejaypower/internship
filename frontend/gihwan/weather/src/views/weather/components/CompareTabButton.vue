<template>
  <v-tooltip
    v-if="!isCompareTab"
    bottom
  >
    <template #activator="{ on }">
      <span
        class="disabled-btn"
        v-on="on"
      >날씨 비교</span>
    </template>
    <span>현재 위치와 지역별 위치를 선택해 주세요.</span>
  </v-tooltip>
  <router-link
    v-else
    to="compare"
  >
    날씨 비교
  </router-link>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('weather', ['currentData', 'locationCoord']),
    isCompareTab() {
      return this.currentData?.temp && this.locationCoord
    },
  },
}
</script>

<style scoped>
.disabled-btn {
  color:#6558f5;
  opacity:0.5
}
</style>
