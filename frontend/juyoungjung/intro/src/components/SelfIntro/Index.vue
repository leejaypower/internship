<template>
  <div>
    <side-bar
      :is-kor="isKor"
    />
    <main>
      <v-switch
        v-model="isKor"
        inset
        dark
        :label="`${toggleLabel}`"
      />
      <landing-page :is-kor="isKor" />
      <current-me :is-kor="isKor" />
      <my-dream :is-kor="isKor" />
      <with-barogo :is-kor="isKor" />
    </main>
    <footer>
      <contact-me :is-kor="isKor" />
    </footer>
    <scroll-to-top-btn />
  </div>
</template>

<script>
import LandingPage from './LandingPage.vue'
import CurrentMe from './About/CurrentMe.vue'
import MyDream from './About/MyDream.vue'
import WithBarogo from './About/WithBarogo.vue'
import ContactMe from './ContactMe.vue'
import SideBar from '../SideBar.vue'
import ScrollToTopBtn from '../ScrollToTopBtn.vue'

export default {
  name: 'App',
  components: {
    LandingPage,
    SideBar,
    CurrentMe,
    MyDream,
    WithBarogo,
    ContactMe,
    ScrollToTopBtn,
  },
  data() {
    return {
      isKor: true,
      label: '한글',
    }
  },
  computed: {
    toggleLabel() {
      return this.isKor ? '한글' : 'eng'
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/self_intro.scss';
</style>
