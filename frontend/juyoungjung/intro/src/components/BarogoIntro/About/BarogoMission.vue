<template>
  <section
    id="BarogoMission"
    class="about"
  >
    <v-container>
      <v-row
        justify="center"
        align="center"
      >
        <v-col
          cols="12"
          md="6"
        >
          <div class="text_container">
            <span>{{ text }}</span>
          </div>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <div class="img_container">
            <img
              src="~@/assets/images/barogo_logo.png"
              alt="barogo_logo"
            >
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  name: 'BarogoMission',
  props: {
    isKor: Boolean,
  },
  data() {
    return { text: '세상의 모든 사업자와 고객을 연결하는 최고로 존경받는 행복한 회사. 라스트마일 딜리버리(Last Mile Delivery) 시장의 선도 기업으로 고품질의 근거리 물류 IT 플랫폼 서비스와 솔루션을 제공하고, 다양한 소비자의 니즈를 충족시키기 위한 창의적인 혁신을 추구합니다.' }
  },
  watch: {
    isKor() {
      this.text = this.isKor
        ? '세상의 모든 사업자와 고객을 연결하는 최고로 존경받는 행복한 회사. 라스트마일 딜리버리(Last Mile Delivery) 시장의 선도 기업으로 고품질의 근거리 물류 IT 플랫폼 서비스와 솔루션을 제공하고, 다양한 소비자의 니즈를 충족시키기 위한 창의적인 혁신을 추구합니다.'
        : 'The most respected and happy company that connects customers to all the operators in the world, is a leader in the Last Mile Delivery market, providing high-quality near-field logistics IT platform services and solutions, and seeking creative innovation to meet the needs of diverse consumers.'
    },
  },
}
</script>
