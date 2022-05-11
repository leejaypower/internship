<template>
  <div id="wrapper">
    <div
      ref="carousel"
      class="carousel"
      @scroll="delayScroll(checkScroll)"
    >
      <div
        ref="content"
        class="carousel__contents"
        :style="{width: computedContentWidth}"
      >
        <img
          v-for="(img,i) in imageItems"
          :key="i"
          ref="images"
          class="content__images"
          :alt="img.alt"
          :src="img.src"
          @click="selectImage(i)"
          @keydown.enter="selectImage(i)"
        >
      </div>
    </div>
    <button
      id="prev"
      ref="prev"
      @click="clickPrev"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          d="M0 0h24v24H0V0z"
        />
        <path d="M15.61 7.41L14.2 6l-6 6 6 6 1.41-1.41L11.03 12l4.58-4.59z" />
      </svg>
    </button>
    <button
      id="next"
      ref="next"
      @click="clickNext"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          d="M0 0h24v24H0V0z"
        />
        <path d="M10.02 6L8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z" />
      </svg>
    </button>
  </div>
</template>

<script>
import imageSet from '../lib/carouselSrc'

export default {
  name: 'MyCarousel',
  components: {
  },
  props: {
    imageSet: {
      type: Array,
      default: () => imageSet,
    },
  },
  data() {
    return {
      selectedImage: null,
      scrollTimer: null,
      autoPassTimer: null,
      computedContentWidth: null,
      imageItems: this.imageSet,
    }
  },
  computed: {
    computedGap() {
      const image = this.$refs.images[0]
      const imageSize = window.getComputedStyle(image).width
      return Number(imageSize.replace('px', '')) + 15
    },
  },
  mounted() {
    this.setAutoPass()
  },
  destroyed() {
    clearInterval(this.autoPassTimer)
  },
  methods: {
    setAutoPass() {
      this.autoPassTimer = setInterval((e) => {
        this.clickNext(e, this.computedGap)
      }, 3000)
    },
    clickNext(e, gap = this.computedGap * 2) {
      const {
        carousel, prev, content, next,
      } = this.$refs
      const carouselWidth = this.$refs.carousel.offsetWidth
      carousel.scrollBy(gap, 0)
      if (carousel.scrollWidth !== 0) {
        prev.style.display = 'flex'
      }
      if (content.scrollWidth - carouselWidth <= carousel.scrollLeft + carouselWidth) {
        next.style.display = 'none'
      }
    },
    clickPrev(e, gap = this.computedGap * 2) {
      const width = this.$refs.carousel.offsetWidth
      const {
        carousel, prev, content, next,
      } = this.$refs
      carousel.scrollBy(-gap, 0)
      if (carousel.scrollLeft - width - gap <= 0) {
        prev.style.display = 'none'
      }
      if (!content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
        next.style.display = 'flex'
      }
    },
    delayScroll(fn) {
      if (this.scrollTimer) {
        clearTimeout(this.scrollTimer)
      }
      this.scrollTimer = setTimeout(fn, 300)
    },
    checkScroll() {
      const { carousel } = this.$refs
      const mainImageNumber = Math.round(carousel.scrollLeft / this.computedGap)
      this.$emit('passImage', mainImageNumber)
    },
    selectImage(selectedNumber) {
      clearInterval(this.autoPassTimer)
      const imageLocation = selectedNumber * this.computedGap
      const { carousel } = this.$refs
      const presentLocation = carousel.scrollLeft
      carousel.scrollBy(imageLocation - presentLocation, 0)
      this.$emit('imageSelected', selectedNumber)
    },
  },
}

</script>

<style>
#bodyWrap {
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
}

#wrapper {
  width: 70%;
  margin-bottom: 20px;
  position: relative;
}

.carousel__contents {
  display: flex;
  justify-content: flex-start;
  position:relative;
  margin: auto;
  box-sizing: border-box;
}

.carousel {
  position: relative;
  overflow: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
}

.content__images{
  margin-right: 15px;
  width: 10vw;
}

#prev,#next {
  display: flex;
  justify-content: center;
  align-content: center;
  background: rgba(255, 255, 255, 0.684);
  border: none;
  height:40px;
  padding: 8px;
  border-radius: 50%;
  outline: 0;
  cursor: pointer;
  position: absolute;
}

#prev {
  top: 50%;
  left: 0;
  transform: translate(50%, -50%);
  display: none;
}

#next {
  top: 50%;
  right: 0;
  transform: translate(-50%, -50%);
}

.item {
  width: 180px;
  height: 180px;
  background: green;
}

.selected{
  border: 2px solid yellow;
}

</style>
