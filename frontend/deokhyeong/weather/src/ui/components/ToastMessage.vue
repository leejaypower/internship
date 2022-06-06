<template>
  <v-snackbar
    v-model="show"
    :color="color"
    :timeout="timeout"
    top
    absolute
  >
    {{ message }}
  </v-snackbar>
</template>

<script>
import colors from '@/constants/colors'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      show: false,
    }
  },
  computed: {
    ...mapGetters('alert', ['status', 'message', 'createdAt', 'timeout']),
    color() {
      return this.statusColorParser(this.status)
    },
  },
  watch: {
    createdAt() {
      this.show = true
    },
  },
  mounted() {
    if (this.createdAt) {
      this.show = true
    }
  },
  methods: {
    statusColorParser(status) {
      switch (status) {
        case 200:
          return colors.SUCCESS_COLOR
        case 400:
        case 401:
        case 404:
        default:
          return colors.ERROR_COLOR
      }
    },
  },
}
</script>
