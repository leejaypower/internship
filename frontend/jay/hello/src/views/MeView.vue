<template>
  <transition
    name="fade-in"
  >
    <div v-if="show">
      <article class="black">
        <header>
          <h1 class="point-color">
            Junior Frontend Developer
          </h1>
          <p>
            저는 작년 6월에 자바로 개발 공부를 처음 시작했으며, 현재 자바스크립트와 뷰를 공부중입니다.<br>
            사용자와 상호작용하는 콘텐츠에 관심이 많습니다! 사람들에게 가치와 감동을 전하는 서비스를 만드는 개발자가 되고 싶습니다. :)
          </p>
        </header>
        <vue-carousel :slides="slides" />
      </article>
      <main-button />
      <article class="black">
        <h1 class="subject">
          MBTI
        </h1>
        <section class="mbti-wrapper">
          <p class="mbti">
            I N F P
          </p>
          <p
            class="point-desc"
          >
            열정적인 중재자, 잔 다르크형
          </p>
        </section>
      </article>
      <div class="black-gradient" />
      <article class="white">
        <h1 class="black-color">
          Contact
        </h1>
        <p class="black-color">
          jayloper@barogo.com
        </p>
        <p class="black-color">
          010 - 7744 - 3401
        </p>
      </article>
    </div>
  </transition>
</template>

<script>
import VueCarousel from '@/components/VueCarousel.vue'
import jay1 from '../assets/images/jay1.jpeg'
import jay2 from '../assets/images/jay2.jpeg'
import jay3 from '../assets/images/jay3.jpeg'

export default {
  components: { VueCarousel },
  data() {
    return {
      show: false,
      slides: [
        jay1,
        jay2,
        jay3,
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

header{
  padding: 3vw;
  display: inline-block;
  position: absolute;
  z-index: 100;
}

h1{
  font-size: 50px;
  font-weight: 400;
  color: white;
  margin: 0;
}

p{
  color: white;
  font-size: 16px;
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

.point-color{
  background: linear-gradient(90deg, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);
  color: transparent;
  background-clip: text;
}

.point-desc{
  font-size: 3vw;
  background: linear-gradient(90deg, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);
  color: transparent;
  background-clip: text;
  text-align: center;
  margin:0;
}

.black{
  height: 100vh;
  background-color: black;
}

.black-gradient{
height: 30vh;
 background: linear-gradient(180deg, rgba(0,0,0,1) 0%,
  rgba(148,148,148,1) 54%,
  rgba(255,255,255,1) 79%);
}

.white{
  background-color: white;
  text-align: center;
  margin-bottom: 5vw;
}

.black-color{
  color: black;
}

.subject{
  padding: 3vw;
}

.mbti-wrapper{
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.mbti{
  text-align: center;
  font-size: 10vw;
  background: linear-gradient(90deg, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);
  color: transparent;
  background-clip: text;
  margin: 4vw 0;
}

</style>
