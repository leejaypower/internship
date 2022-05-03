<template>
  <div>
    <side-bar
      :is-kor="isKor"
    />
    <v-main>
      <v-switch
        v-model="isKor"
        inset
        color="indigo"
        :label="`${toggleLabel}`"
      />
      <landing-page :is-kor="isKor" />
      <barogo-mission :is-kor="isKor" />
      <barogo-vision :is-kor="isKor" />
    </v-main>
    <scroll-to-top-btn />
  </div>
</template>

<script>
import LandingPage from './LandingPage.vue'
import SideBar from '../SideBar.vue'
import BarogoMission from './About/BarogoMission.vue'
import BarogoVision from './About/BarogoVision.vue'
import ScrollToTopBtn from '../ScrollToTopBtn.vue'

export default {
  name: 'App',
  components: {
    LandingPage,
    SideBar,
    BarogoMission,
    BarogoVision,
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
