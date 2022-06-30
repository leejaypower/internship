<template>
  <v-bottom-navigation
    color="teal"
    grow
    app
  >
    <v-btn
      to="/one-week-forecast"
      height="100%"
      text
    >
      <span>주간 예보</span>
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
    <v-btn
      v-if="isTestTabView"
      to="/error-test"
      height="100%"
      text
    >
      <span>테스트 페이지</span>
      <v-icon>mdi-ab-testing</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
<script>
export default {
  name: 'BottomNavigation',
  data() {
    return {
      isTestTabView: process.env.NODE_ENV !== 'production',
    }
  },
}
</script>
