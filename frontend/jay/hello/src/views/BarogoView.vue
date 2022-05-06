<template>
  <transition
    name="fade-in"
  >
    <div v-if="show">
      <article class="black">
        <header>
          <h1>생태계의 가치를 높이는 초연결 플랫폼.</h1>
          <p>
            바로고(Barogo)는 라스트마일 딜리버리 플랫폼으로 시장 모든 비즈니스와 고객을 연결합니다.<br>
            일상과 비즈니스에 필요한 모든 것을 연결하여 상생과 성장을 지원하는 생태계를 만들고자 합니다.
          </p>
        </header>
        <vue-carousel :slides="slides" />
        <main-button />
      </article>
      <article class="black">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/sAIi1J1_EJk"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media;
          gyroscope; picture-in-picture"
          allowfullscreen
        />
      </article>
    </div>
  </transition>
</template>

<script>
import VueCarousel from '@/components/VueCarousel.vue'
import image1 from '../assets/images/barogo1.jpeg'
import image2 from '../assets/images/barogo2.jpeg'
import image3 from '../assets/images/barogo3.jpeg'

export default {
  components: { VueCarousel },
  data() {
    return {
      show: false,
      slides: [
        image1,
        image2,
        image3,
      ],
    }
  },
  mounted() {
    setTimeout(() => {
      this.show = true
    }, 1000)
  },
}
</script>

<style scoped>
article{
  height: 100vh;
}

header{
  padding: 3vw;
  display: inline-block;
  position: absolute;
  z-index: 100;
}

main{
  width: 100%;
  margin: auto;
}

h1{
  font-size: 3vw;
  font-weight: 400;
  color: white;
  margin: 0;
}

p{
  color:white;
  font-size: 16px;
}

img{
  width: 80%;
}

.fade-in-enter{
  opacity: 0;
}

.fade-in-enter-active {
  transition: all 0.5s;
}
.fade-in-enter-to {
  opacity: 1;
}

.black{
  height: 100vh;
  background-color: black;
}

</style>
