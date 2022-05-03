<template>
  <section id="LandingPage">
    <vue-typer
      :text="text"
      :erase-on-complete="true"
      caret-animation="blink"
      :pre-type-delay="1000"
      :type-delay="150"
      :pre-erase-delay="2000"
      :erase-delay="100"
      erase-style="backspace"
    />
  </section>
</template>

<script>
export default {
  name: 'LandingPage',
  props: {
    isKor: Boolean,
  },
  data() {
    return {
      text: [
        '최고의 전문가',
        '진정성 있는 가치 추구',
        '존중하는 마인드와 행복',
        '열린 기회와 아이디어',
        '행동하는 도전가',
      ],
    }
  },
  watch: {
    isKor() {
      this.text = this.isKor
        ? [
          '최고의 전문가',
          '진정성 있는 가치 추구',
          '존중하는 마인드와 행복',
          '열린 기회와 아이디어',
          '행동하는 도전가',
        ]
        : [
          'Best talent',
          'Authenticity',
          'Respect each other',
          'Open mindset',
          'Go!',
        ]
    },
  },
}
</script>
<style lang="scss" scoped>
.vue-typer {
  font-size: 36px;
}
</style>
