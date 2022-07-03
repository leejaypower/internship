<template>
  <v-snackbar
    v-if="alarm"
    value="alarm"
  >
    {{ text }}
    <template #action="{ attrs }">
      <v-btn
        :color="alarmColor"
        text
        v-bind="attrs"
        @click="alarm = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>

export default {
  name: 'SnackBar',
  data: () => ({
    alarm: false,
    alarmColor: 'pink',
    text: '축하합니다. 회원가입에 성공하셨습니다.',
  }),
  computed: {
    storedSnackBarInfo() {
      return { ...this.$store.getters['snackBarStore/getSnackBarInfo'] } // 얕은 복사를 우려하여 스프레드로 가져옴
    },
  },
  watch: {
    storedSnackBarInfo() {
      this.alarm = this.storedSnackBarInfo.alarm
      this.text = this.storedSnackBarInfo.text
      this.alarmColor = this.storedSnackBarInfo.alarmColor
    },
  },
}
</script>
