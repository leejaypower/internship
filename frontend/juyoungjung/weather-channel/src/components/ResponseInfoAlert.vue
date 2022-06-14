<template>
  <v-alert
    :value="responseInfo.visible"
    :type="responseInfo.type"
    dismissible
    @input="closeAlert"
  >
    <span>{{ responseInfoMessage }}</span>
  </v-alert>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ResponseInfoAlert',
  computed: {
    ...mapGetters('user', ['responseInfo', 'responseInfoMessage']),
  },
  updated() {
    this.$vuetify.goTo(0)
  },
  methods: {
    closeAlert() {
      this.$store.dispatch('user/resetResponseInfo')
    },
  },
}
</script>
