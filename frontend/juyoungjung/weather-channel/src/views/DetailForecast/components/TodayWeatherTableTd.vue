<template>
  <td>
    <v-row :class="responsiveTdPadding">
      <v-col
        cols="12"
        md="6"
      >
        <v-icon
          color="light-blue"
          class="pr-3"
        >
          {{ icon }}
        </v-icon>
        <span>{{ label }}</span>
      </v-col>

      <v-col
        md="6"
      >
        <span :class="responsiveSheetTableTdFontSize">
          {{ content }}
        </span>
      </v-col>
    </v-row>
  </td>
</template>
<script>
import {
  PC_PADDING,
  MOBILE_PADDING,
  PC_TABLE_TD_FONT_SIZE,
  MOBILE_TABLE_TD_FONT_SIZE,
} from '@/constants'

export default {
  name: 'TodayWeatherTableTd',
  props: {
    icon: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
  },
  computed: {
    responsiveTdPadding() {
      return this.$vuetify.breakpoint.mdAndDown ? MOBILE_PADDING : PC_PADDING
    },
    responsiveSheetTableTdFontSize() {
      return this.$vuetify.breakpoint.mdAndDown
        ? MOBILE_TABLE_TD_FONT_SIZE : PC_TABLE_TD_FONT_SIZE
    },
  },
}
</script>
