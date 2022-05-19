<template>
  <v-row
    no-gutters
  >
    <v-col
      cols="6"
    >
      <v-img
        :src="logoSrc"
        :height="logoHeight"
        contain
        :position="logoPosition"
      />
    </v-col>
    <v-col
      cols="6"
      align-self="center"
    >
      <span class="text-h6">{{ title }}</span>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    logoSrc: {
      type: String,
      default: '/',
      required: true,
    },
    logoHeight: {
      type: Number,
      default: 0,
      required: true,
    },
    logoPosition: {
      type: String,
      default: '',
      required: true,
    },
    title: {
      type: String,
      default: '',
      required: true,
    },
  },
}
</script>

<style>

</style>
