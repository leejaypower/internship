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
        '안녕하세요.',
        '반갑습니다.',
        '제 이름은 정주영입니다.',
        '저는 주니어 개발자입니다.',
        '현재 프론트엔드 기술에 관심이 많습니다.',
      ],
    }
  },
  watch: {
    isKor() {
      this.text = this.isKor
        ? [
          '안녕하세요.',
          '반갑습니다.',
          '제 이름은 정주영입니다.',
          '저는 주니어 개발자입니다.',
          '현재 프론트엔드 기술에 관심이 많습니다.',
        ]
        : [
          'Hello.',
          'Welcome.',
          'My name is Juyoung Jung.',
          'I am a junior programmer.',
          'I am interested in front-end engineering.',
        ]
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/self_intro.scss';

.vue-typer {
  font-size: 36px;
}
</style>
