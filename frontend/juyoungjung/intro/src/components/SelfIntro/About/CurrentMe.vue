<template>
  <section
    id="CurrentMe"
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
              src="~@/assets/images/profile_me.png"
              alt="profile_me"
            >
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
<script>
export default {
  name: 'CurrentMe',
  props: {
    isKor: Boolean,
  },
  data() {
    return { text: '저는 다른 사람의 관점에서 생각하는 것에 흥미가 많습니다. 사용자의 관점에서 해당 서비스가 어떻게 보여지고 경험될지 치열하게 고민하는 분야가 프론트엔드 분야라고 생각해 관심이 많습니다. 그래서 저는 현재 최신 프론트엔드 기술들을 공부하고 있습니다.' }
  },
  watch: {
    isKor() {
      this.text = this.isKor
        ? '저는 다른 사람의 관점에서 생각하는 것에 흥미가 많습니다. 사용자의 관점에서 해당 서비스가 어떻게 보여지고 경험될지 치열하게 고민하는 분야가 프론트엔드 분야라고 생각해 관심이 많습니다. 그래서 저는 현재 최신 프론트엔드 기술들을 공부하고 있습니다.'
        : "I'm very interested in thinking from another person's point of view. I'm interested in the front-end field because I think this field is where fiercely considered how it will be viewed and experienced the service from the user's point of view. So I'm currently studying the latest front-end techniques."
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/self_intro.scss';
</style>
