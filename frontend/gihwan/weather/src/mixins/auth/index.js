import { DESKTOP_INPUT_WIDTH_RATIO, MOBILE_INPUT_WIDTH_RATIO } from '@/constants'

const authMixins = {
  computed: {
    responsiveInputCols() {
      return this.$vuetify.breakpoint.mobile ? MOBILE_INPUT_WIDTH_RATIO : DESKTOP_INPUT_WIDTH_RATIO
    },
    alertPosition() {
      return this.$vuetify.breakpoint.mobile ? 'top' : 'top-end'
    },
  },
}

export default authMixins
