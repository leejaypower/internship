<template>
  <v-bottom-navigation
    color="teal"
    grow
    app
  >
    <v-btn
      height="100%"
      text
    >
      <span>7일 예보</span>
      <v-icon>mdi-history</v-icon>
    </v-btn>
    <v-btn
      to="/"
      height="100%"
      text
    >
      <span>홈</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-btn
      to="/my-page"
      height="100%"
      text
    >
      <span>마이 페이지</span>
      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
<script>
export default {}
</script>
