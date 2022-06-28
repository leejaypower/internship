import {
  FORECAST_ALL_PC_SHEET_PADDING,
  FORECAST_ALL_MOBILE_SHEET_PADDING,
} from '@/constants'

const responsiveSheetMixin = {
  computed: {
    responsiveSheetPaddingMixin() {
      return this.$vuetify.breakpoint.mdAndDown
        ? FORECAST_ALL_MOBILE_SHEET_PADDING : FORECAST_ALL_PC_SHEET_PADDING
    },
  },
}

export default responsiveSheetMixin
