<template>
  <v-alert
    :value="responseInfo.visible"
    :type="responseInfo.type"
    dismissible
    @input="closeResponseInfoAlert"
  >
    <span>{{ responseInfoMessage }}</span>
  </v-alert>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ResponseInfoAlert',
  data: () => ({

  }),
  computed: {
    ...mapGetters('user/', ['responseInfo', 'responseInfoMessage']),
  },
  methods: {
    closeResponseInfoAlert() {
      this.$store.dispatch('user/resetResponseInfo')
    },
  },
}
</script>
