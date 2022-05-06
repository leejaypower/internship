<template>
  <section>
    <div
      id="slider"
    >
      <transition-group
        tag="div"
        :name="transitionName"
        class="slides-group"
      >
        <img
          v-if="show"
          :key="current"
          class="slide"
          :src="slides[current]"
          alt="슬라이드 이미지"
        >
      </transition-group>
    </div>
    <button
      class="btn btn-prev"
      aria-label="Previous slide"
      @click="slide(-1)"
      @keyup.enter="slide(-1)"
    >
      &#10094;
    </button>
    <button
      class="btn btn-next"
      aria-label="Next slide"
      @click="slide(1)"
      @keyup.enter="slide(1)"
    >
      &#10095;
    </button>
  </section>
</template>

<script>
import calculatePage from '../utils/index'

export default {
  props: {
    slides: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      current: 0,
      direction: 1,
      transitionName: 'fade',
      show: false,
    }
  },
  mounted() {
    this.show = true
  },
  methods: {
    slide(dir) {
      this.direction = dir
      if (dir === 1) {
        this.transitionName = 'slide-next'
      } else {
        this.transitionName = 'slide-prev'
      }
      const len = this.slides.length
      this.current = calculatePage(this.current, dir, len)
    },
  },

}
</script>

<style scoped>

.fade-enter-active {
  transition: opacity 1s;
}
.fade-enter {
  opacity: 0;
}

.slide-next-enter-active,
.slide-next-leave-active {
  transition: transform 0.5s ease-in-out;
}
.slide-next-enter {
  transform: translate(100%);
}
.slide-next-leave-to {
  transform: translate(-100%);
}

.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: transform 0.5s ease-in-out;
}
.slide-prev-enter {
  transform: translate(-100%);
}
.slide-prev-leave-to {
  transform: translate(100%);
}

img{
  object-fit: cover;
}

#slider {
  width: 100vw;
  height: 90vh;
  position: relative;
  opacity: 0.5;
  z-index: 5;
}

.slide {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn {
  color: white;
  background-color: transparent;
  cursor: pointer;
  border: 3px solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  position: absolute;
  top: calc(50% - 35px);
  left: 3%;
  transition: transform 0.3s ease-in-out;
  user-select: none;
  z-index: 100;
}

.btn-next {
  left: auto;
  right: 3%;
}

.btn:hover {
  transform: scale(1.1);
}

.slides-group{
  height: 100vh;
}

</style>
