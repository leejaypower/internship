<template>
  <section id="ContactMe">
    <v-container>
      <v-row
        justify="center"
        align="center"
      >
        <v-col
          cols="2"
          md="3"
        >
          <v-divider />
        </v-col>
        <v-col
          cols="8"
          md="6"
          class="d-flex justify-space-around"
        >
          <v-btn
            text
            large
            href="mailto:maliethy@gmail.com"
            target="_blank"
          >
            <v-icon
              x-large
              color="white"
            >
              mdi-email
            </v-icon>
          </v-btn>
          <v-btn
            text
            large
            href="tel:010-5500-2288"
          >
            <v-icon
              x-large
              color="white"
            >
              mdi-cellphone
            </v-icon>
          </v-btn>
          <v-btn
            text
            large
            href="https://velog.io/@maliethy"
            target="_blank"
          >
            <v-icon
              x-large
              color="white"
            >
              mdi-notebook-multiple
            </v-icon>
          </v-btn>
          <v-btn
            text
            large
            href="https://github.com/maliethy"
            target="_blank"
          >
            <v-icon
              x-large
              color="white"
            >
              mdi-github
            </v-icon>
          </v-btn>
          <v-btn
            text
            large
            href="https://map.naver.com/v5/search/%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EA%B0%95%EB%8F%99%EA%B5%AC%20%EB%AA%85%EC%9D%BC%EB%8F%99/address/14153646.035825778,4516224.354388114,%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EA%B0%95%EB%8F%99%EA%B5%AC%20%EB%AA%85%EC%9D%BC%EB%8F%99,adm?c=14153537.0651762,4515813.1110285,14,0,0,0,dh"
            target="_blank"
          >
            <v-icon
              x-large
              color="white"
            >
              mdi-map-marker-radius
            </v-icon>
          </v-btn>
        </v-col>
        <v-col
          cols="2"
          md="3"
        >
          <v-divider />
        </v-col>
      </v-row>
      <v-row>
        <h1 v-if="isKor">
          반갑습니다!
        </h1>
        <h1 v-else>
          Contact Me
        </h1>
      </v-row>
      <v-row>
        <p>copyright @ 2022 Juyoung Jung</p>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  name: 'ContactMe',
  props: {
    isKor: Boolean,
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/self_intro.scss';
section{
  height:40vh;
  background-color: black;
  padding: 24px 0;
  font-family: 'NotoSansKR';
}

i.v-icon.v-icon {
  color: white;
}

.theme--light.v-divider {
  border-color: white;
}

h1 {
  margin: 40px auto 20px;
  color: white;
}

p {
  margin: 24px auto;
  font-size: 14px;
  color: white;
}
</style>
