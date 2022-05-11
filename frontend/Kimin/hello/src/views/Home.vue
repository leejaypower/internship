<template>
  <div class="home-view">
    <div class="second-line">
      <router-link
        class="second-line__left"
        to="/Kimin"
      />
      <router-link
        class="second-line__right"
        to="/Barogo"
      />
    </div>
    <div class="body-cover">
      <router-link
        class="home-view__left-side"
        to="/Kimin"
      >
        <div class="body-cover__title">
          저를 <br>소개하겠습니다.
        </div>
      </router-link>
      <router-link
        class="home-view__right-side"
        to="/Barogo"
      >
        <div class="body-cover__title">
          저희 회사를 <br> 소개하겠습니다
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  methods: {
  },
}
</script>

<style scoped>
  .home-view{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 90vh;
  }

  .second-line{
    display: flex;
    width: 100%;
    height: 5vh;
    background-color: rgb(107, 107, 137);
  }

  .second-line__left{
    width: 50%;
    background-color: rgb(79, 228, 79);;
  }

  .second-line__right{
    width: 50%;
    background-color: rgb(0, 166, 255);
  }

  .body-cover{
    display: flex;
    width: 100%;
    height: 70vh;
    justify-content: center;
    align-items: center;
    font-size: 8vh;
  }
  .home-view__left-side{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35%;
    height: 80%;
    background-color: rgba(79, 228, 79, 0.1);
    text-decoration: none;
  }

  .home-view__right-side{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35%;
    height: 80%;
    background-color: rgba(0, 166, 255, 0.1);;
    text-decoration: none;
  }

  .body-cover__title{
    text-align: center;
  }

</style>
