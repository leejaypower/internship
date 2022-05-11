<template>
  <div class="header">
    <div class="first-line">
      <router-link
        to="/Kimin"
        class="first-line_anchor"
        @click.native="changeMenu(true)"
      >
        <h4
          class="first-line_title"
        >
          김기민의 자기소개 페이지
        </h4>
      </router-link>
      <router-link
        v-if="menuType"
        class="first-line_anchor"
        to="/"
      >
        <div
          v-if="menuType"
          class="first-line_logo-cover"
        >
          🎃 It's Me
        </div>
      </router-link>
      <router-link
        v-else
        class="first-line_anchor"
        to="/"
      >
        <picture class="first-line_logo-cover">
          <source
            media="(min-width: 1000px)"
            srcset="../../assets/company/barogoLogoS.jpg"
          >
          <source
            media="(min-width: 3000px)"
            srcset="../../assets/company/barogoLogoL.jpeg"
          >
          <img
            src="../../assets/company/barogoLogoS.jpg"
            alt="BargoLogo"
          >
        </picture>
      </router-link>
      <router-link
        ref="Barogo"
        to="/Barogo"
        class="first-line_anchor"
        @click.native="changeMenu(false)"
      >
        <h4 class="first-line_title">
          Korean No.1 Delivery Platform Barogo
        </h4>
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      menuType: false,
    }
  },
  methods: {
    changeMenu(value) {
      this.menuType = value
    },
  },
}
</script>

<style scoped>
  .header{
    width:100%;
  }

  .first-line{
    display: flex;
    width: 100%;
    height: 5vh;
    justify-content: space-between;
    align-items: center;
    font-size: 24px;
    font-weight: 800;
  }

  .first-line_anchor{
    color:black !important;
    display: inline-flex;
    justify-content: center;
    width: 35%;
    height: 100%;
    text-decoration: none;
    margin: 0;
    font-size: 1vw;
  }

  .first-line_logo-cover{
    display:flex;
    align-items: center;
  }

  .first-line_anchor:nth-child(1){
    border-radius: 0 50px 0 0;
    background-color: rgb(79, 228, 79);
  }

  .first-line_anchor:nth-child(3){
    border-radius: 50px 0 0 0;
    background-color:rgb(0, 166, 255);
  }

  .first-line_title {
    margin: 0;
    display: flex;
    align-items: center;
  }

</style>
