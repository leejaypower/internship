<template>
  <v-container
    class="main-container"
  >
    <v-row
      align="center"
      no-gutters
      class="mb-16"
    >
      <v-col class="d-flex align-center">
        <img
          src="@/assets/Sun.png"
          alt="햇님"
          class="main-container__logo-image"
        >
        <span class="mainTitle">바로날씨</span>
      </v-col>
    </v-row>
    <v-row
      no-gutters
      class="d-flex justify-space-between"
    >
      <time-box />
      <sign-in-box v-if="signInBox" />
      <greeting-box v-if="!signInBox" />
    </v-row>
  </v-container>
</template>

<script>
import TimeBox from '@/views/signInPage/components/TimeBox.vue'
import SignInBox from '@/views/signInPage/components/SignInBox.vue'
import GreetingBox from '@/views/signInPage/components/GreetingBox.vue'
import { mapActions } from 'vuex'

export default {
  name: 'SignInPage',
  components: {
    TimeBox, SignInBox, GreetingBox,
  },
  data() {
    return {
      signInBox: true,
    }
  },
  async mounted() {
    await this.checkLogIn()
  },
  methods: {
    ...mapActions([
      'getMyInfo',
    ]),
    async checkLogIn() {
      try {
        await this.getMyInfo()
        this.signInBox = false
      } catch (error) {
        this.signInBox = true
      }
    },
  },
}
</script>

<style scoped>
  .main-container {
    height: 100%;
  }

 .mainTitle {
    font-size: 4vh;
 }

 .main-container__logo-image{
   width: 9vh;
 }

</style>
