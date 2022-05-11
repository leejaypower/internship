<template>
  <div class="body-wrap">
    <div class="main-contents mt-7 mb-15">
      <img
        :src="imageSet[mainImage].src"
        :alt="imageSet[mainImage].alt"
        class="main-contents__image"
      >
      <div
        class="main-contents__explain pl-4"
      >
        <h3 class="main-contents__title">
          이름: {{ imageSet[mainImage].title }}
        </h3>
        <p class="main-contents__category">
          카테고리: {{ imageSet[mainImage].category }}
        </p>
        <p class="main-contents__contents">
          {{ imageSet[mainImage].contents }}
        </p>
      </div>
    </div>
    <carousel
      :image-set="imageSet"
      @imageSelected="selectMain"
      @passImage="showMain"
    />
  </div>
</template>

<script>

import carousel from '../../components/Carousel.vue'
import ImageSets from '../../lib/carouselSrc'

export default {
  name: 'TasteView',
  components: {
    carousel,
  },
  data() {
    return {
      imageSet: ImageSets.tasteImageSet,
      mainImage: 0,
    }
  },
  mounted() {
  },
  methods: {
    selectMain(number) {
      this.mainImage = number
    },
    showMain(number) {
      this.mainImage = number
    },
  },
}

</script>

<style scoped>
.main-contents{
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  height: 50%;
}

.main-contents__explain{
  width: 50vh;
  height: 50vh;
  max-height: 400px;
}

.main-contents__image{
  width: 50vh;
  height: 50vh;
  max-width: 400px;
  max-height: 400px;
}

.body-wrap {
  margin: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}

.main-contents__title, .main-contents__category, .main-contents__contents{
  text-align: left;
}

</style>
