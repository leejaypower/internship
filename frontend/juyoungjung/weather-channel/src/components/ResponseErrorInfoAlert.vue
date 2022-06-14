<template>
  <v-alert
    :value="responseErrorInfo.visible"
    :type="responseErrorInfo.type"
    dismissible
    @input="closeAlert"
  >
    <span>{{ responseErrorInfoMessage }}</span>
  </v-alert>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ResponseErrorInfoAlert',
  computed: {
    ...mapGetters('weather', ['responseErrorInfo', 'responseErrorInfoMessage']),
  },
  methods: {
    closeAlert() {
      this.$store.dispatch('weather/resetResponseInfo')
    },
  },
}
</script>
