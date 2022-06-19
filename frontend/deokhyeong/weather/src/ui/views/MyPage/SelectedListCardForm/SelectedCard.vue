<template>
  <v-card
    :color="cardColor"
    class="d-flex justify-center mb-3"
  >
    <v-card-title
      class="text-h6"
    >
      <span v-if="isValidLocationInfo">{{ location }}</span>
      <ul
        v-else
        class="info-items-wrapper"
      >
        <li
          class="text-center font-weight-bold pb-4"
          :class="infoMessageClass"
        >
          🙏위치 허용을 부탁드립니다🙏
        </li>
        <li
          class="font-weight-medium"
          :class="infoSubMessageClass"
        >
          🟢 허용 시 : 위치를 설정하지 않으면 현재 위치만 보입니다.
        </li>
        <li
          class="font-weight-medium"
          :class="infoSubMessageClass"
        >
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
    isValidLocationInfo() {
      return !!this.location
    },
    cardColor() {
      return this.location ? '#009688' : '#E1F5FE'
    },
    infoMessageClass() {
      if (this.$vuetify.breakpoint.width < 500) {
        return { 'text-subtitle-1': true }
      }

      return {
        'text-h6': true,
      }
    },
    infoSubMessageClass() {
      if (this.$vuetify.breakpoint.width < 320) {
        return { caption: true }
      }
      if (this.$vuetify.breakpoint.width < 500) {
        return { 'text-subtitle-2': true }
      }

      return {
        'text-subtitle-1': true,
      }
    },
  },
}
</script>

<style scoped>
.info-items-wrapper {
  list-style: none
}
</style>
