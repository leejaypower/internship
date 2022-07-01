<template>
  <v-card
    color="#F5F5F5"
    class="d-flex justify-space-between align-center mb-3"
    :class="mobileSize"
  >
    <v-card-title class="text-h6">
      {{ location }}
    </v-card-title>
    <div class="d-flex">
      <v-btn
        color="#F44336"
        @click="$emit('onDeleteButton')"
      >
        제거
      </v-btn>
      <v-btn
        class="ml-4"
        color="#4CAF50"
        @click="$emit('onSelectedButton')"
      >
        선택
      </v-btn>
    </div>
  </v-card>
</template>
<script>
export default {
  props: {
    location: {
      type: String,
      default: '',
    },
  },
  computed: {
    mobileSize() {
      if (this.$vuetify.breakpoint.width < 500) {
        return {
          'flex-column': true,
          'px-1': true,
          'pb-4': true,
        }
      }
      return {
        'px-8': true,
      }
    },
  },
}
</script>
