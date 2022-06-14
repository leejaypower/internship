<template>
  <td>
    <v-row class="d-flex align-center pt-6">
      <v-col cols="6">
        <v-icon
          color="light-blue"
          class="pr-3"
        >
          {{ icon }}
        </v-icon>
        <span>{{ label }}</span>
      </v-col>
    </v-row>
    <v-row class="pl-12 pb-6">
      <v-col cols="6">
        <span class="text-h6">
          {{ content }}
        </span>
      </v-col>
    </v-row>
  </td>
</template>
<script>
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
}
</script>
