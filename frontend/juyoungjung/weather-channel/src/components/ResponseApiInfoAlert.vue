<template>
  <v-alert
    :value="responseApiInfo.visible"
    :type="responseApiInfo.type"
    dismissible
    @input="closeAlert"
  >
    <span>{{ responseApiInfoMessage }}</span>
  </v-alert>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ResponseApiInfoAlert',
  computed: {
    ...mapGetters('weather', ['responseApiInfo', 'responseApiInfoMessage']),
  },
  updated() {
    this.$vuetify.goTo(0)
  },
  methods: {
    closeAlert() {
      this.$store.dispatch('weather/resetApiResponseInfo')
    },
  },
}
</script>
