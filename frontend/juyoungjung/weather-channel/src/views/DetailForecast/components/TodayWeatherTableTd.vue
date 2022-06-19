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
        cols="12"
        md="6"
      >
        <span class="text-h6">
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
  },
}
</script>
