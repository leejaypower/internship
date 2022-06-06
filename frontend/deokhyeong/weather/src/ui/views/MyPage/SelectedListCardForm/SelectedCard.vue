<template>
  <v-card
    :color="cardColor"
    class="d-flex justify-center mb-3"
  >
    <v-card-title
      class="text-h6"
    >
      <span v-if="location">{{ location }}</span>
      <ul
        v-else
        class="info-items-wrapper"
      >
        <li :class="`text-center ${infoMessage} font-weight-bold pb-4`">
          🙏위치 허용을 부탁드립니다🙏
        </li>
        <li :class="`${infoSubMessage} font-weight-medium`">
          🟢 허용 시 : 위치를 설정하지 않으면 현재 위치만 보입니다.
        </li>
        <li :class="`${infoSubMessage} font-weight-medium`">
          🔴 미허용 시 : 북마크 위치가 없으면 서울시 / 강남구 날씨 표시
        </li>
      </ul>
    </v-card-title>
  </v-card>
</template>
<script>
export default {
  props: {
    location: {
      type: String,
      default: '',
    },
  },
  computed: {
    cardColor() {
      return this.location ? '#009688' : '#E1F5FE'
    },
    infoMessage() {
      if (this.$vuetify.breakpoint.width < 500) {
        return 'text-subtitle-1'
      }
      return 'text-h6'
    },
    infoSubMessage() {
      if (this.$vuetify.breakpoint.width < 320) {
        return 'caption'
      }
      if (this.$vuetify.breakpoint.width < 500) {
        return 'text-subtitle-2'
      }
      return 'text-subtitle-1'
    },
  },
}
</script>

<style scoped>
.info-items-wrapper {
  list-style: none
}
</style>
