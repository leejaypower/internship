<template>
  <v-container class="mt-10">
    <v-row>
      <v-col align="center">
        <span class="text-h1 font-weight-bold">
          404
        </span>
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center">
        <span style="fontSize:30px">페이지를 찾을 수 없습니다.❌</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-end">
        <v-btn
          color="info"
          x-large
          @click="$router.push('/weather')"
        >
          <v-icon>mdi-home</v-icon>
          <span>홈으로</span>
        </v-btn>
      </v-col>
      <v-col align="start">
        <v-btn
          color="success"
          x-large
          @click="$router.back()"
        >
          <v-icon>mdi-keyboard-backspace</v-icon>
          <span>뒤로가기</span>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
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

<style scoped>
  .notfound-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .notfound-title {
    font-size: 70px;
  }
  .notfound-goback-button {
    border: 2px solid;
    border-radius: 10px;
    padding: 10px;
    font-size: 30px;
    font-weight: bold;
    background-color: #42b983;
    color:#fff;
    cursor: pointer;
  }
  @media screen and (max-width: 400px){
    .notfound-title {
      font-size: 50px;
    }
    .notfound-goback-button {
      font-size: 20px;
    }
  }
</style>
