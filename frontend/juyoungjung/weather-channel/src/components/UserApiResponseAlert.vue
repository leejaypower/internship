<template>
  <v-alert
    :value="userApiResponse.visible"
    :type="userApiResponse.type"
    dismissible
    @input="closeAlert"
  >
    <span>{{ userApiResponseText }}</span>
  </v-alert>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UserApiResponseAlert',
  computed: {
    ...mapGetters('alert', ['userApiResponse', 'userApiResponseText']),
  },
  updated() {
    this.$vuetify.goTo(0)
  },
  methods: {
    closeAlert() {
      this.$store.dispatch('alert/resetUserApiResponse')
    },
  },
}
</script>
