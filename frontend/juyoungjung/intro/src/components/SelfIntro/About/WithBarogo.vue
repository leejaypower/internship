<template>
  <section
    id="WithBarogo"
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
  name: 'WithBarogo',
  props: {
    isKor: Boolean,
  },
  data() {
    return { text: '이런 저의 미션과 비전을 동료들과 함께 이루어나가기위해 좋은 프론트엔드 개발자로 거듭나고 싶습니다. 이번 바로고 인턴과정에 참여하는 것이 이러한 성장으로 한 걸음 나아갈 수 있는 좋은 기회라고 생각하고 있습니다.' }
  },
  watch: {
    isKor() {
      this.text = this.isKor
        ? '이런 저의 미션과 비전을 동료들과 함께 이루어나가기위해 좋은 프론트엔드 개발자로 거듭나고 싶습니다. 이번 바로고 인턴과정에 참여하는 것이 이러한 성장으로 한 걸음 나아갈 수 있는 좋은 기회라고 생각하고 있습니다.'
        : 'I want to be reborn as a good front-end programmer to achieve my mission and vision with my colleagues. I think participating in this Barogo internship course is a good opportunity to take a step forward with this growth.'
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/self_intro.scss';

.img_container {
  background-color: rgba(255, 255, 255, 0.3);
}
</style>
