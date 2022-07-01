<template>
  <v-card
    class="mx-auto pa-16 d-flex flex-column align-center"
    max-width="700"
  >
    <v-card-text>
      <p class="text-h3 text--primary text-center">
        찾을 수 없는 페이지입니다.
      </p>
    </v-card-text>

    <v-card-actions>
      <v-btn
        text
        color="blue accent-4"
        @click="goBack"
      >
        뒤로 가기
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.back()
    },
  },
}
</script>
