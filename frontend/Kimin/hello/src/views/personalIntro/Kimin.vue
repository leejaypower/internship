<template>
  <div class="kimin-home">
    <div
      class="kimin-home__wrapper"
    >
      <img
        alt="김기민"
        :src="kiminProfile"
        class="kimin-image"
      >
      <div class="kimin-introduce">
        <h1>저를 소개드립니다.</h1>
      </div>
    </div>
  </div>
</template>

<script>
import kiminProfile from '../../assets/kimin/kiminProfile.jpeg'

export default {
  name: 'KiminView',
  data() {
    return {
      kimin: true,
      kiminProfile,
    }
  },
}
</script>

<style scoped>
  .kimin-home{
    display: flex;
    justify-content: center;
    padding-top: 20px;
    height: 80vh;
  }
  .kimin-home__wrapper{
    width: 60%;
    display: flex;
    align-items: center;
  }
  .kimin-image{
    height: 100%
  }

  .kimin-introduce{
    padding-left: 20px;
  }
</style>
