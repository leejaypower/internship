<template>
  <section
    id="BarogoVision"
    class="about"
  >
    <v-container>
      <v-row
        justify="center"
        align="center"
      >
        <v-col cols="6 inline-flex img_container">
          <img
            src="~@/assets/images/mission_1.png"
            alt="mission_1"
          >

          <img
            src="~@/assets/images/mission_2.png"
            alt="mission_2"
          >

          <img
            src="~@/assets/images/mission_3.png"
            alt="mission_3"
          >
        </v-col>
        <v-col cols="6">
          <div class="text_container">
            <span>{{ text }}</span>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  name: 'BarogoVision',
  props: {
    isKor: Boolean,
  },
  data() {
    return { text: '연결을 통한 나눔과 성장을 실천합니다. 바로고의 로고는 ‘세상의 모든 사업자와 고객을 연결한다’라는 바로고의 미션, 철학을 바탕으로 사업자와 고객을 지도 위의 맵핀으로 표현하고 바로고가 그 사이에서 지속적으로 유기적인 연결고리 역할을 하는 모습을 형상화하여 ‘연결의 무한한 가능성’을 나타냅니다.' }
  },
  watch: {
    isKor() {
      this.text = this.isKor
        ? '연결을 통한 나눔과 성장을 실천합니다. 바로고의 로고는 ‘세상의 모든 사업자와 고객을 연결한다’라는 바로고의 미션, 철학을 바탕으로 사업자와 고객을 지도 위의 맵핀으로 표현하고 바로고가 그 사이에서 지속적으로 유기적인 연결고리 역할을 하는 모습을 형상화하여 ‘연결의 무한한 가능성’을 나타냅니다.'
        : "Practice sharing and growth through connection. Based on Barogo's mission and philosophy of 'connecting all operators and customers in the world' the logo represents the infinite possibilities of connection by expressing operators and customers on a map and representing Barogo continuously acting as an organic link between them"
    },
  },
}
</script>
