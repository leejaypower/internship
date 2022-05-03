<template>
  <section :style="{ background: bgColor, flexDirection: type === 'row' ? 'row' : 'column'}">
    <h2
      class="section-title"
      :style="{ color: titleColor }"
    >
      {{ title }}
    </h2>
    <span
      class="section-desc"
      :style="{ color: descColor }"
    >{{ desc }}</span>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: 'Title',
    },
    titleColor: {
      type: String,
      default: 'black',
    },
    desc: {
      type: String,
      required: true,
      default: 'Description',
    },
    descColor: {
      type: String,
      default: 'black',
    },
    type: {
      type: String,
      default: 'column',
    },
    bgColor: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
  section {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 100vh;
  }
  .section-title {
    font-size: 70px;
    font-weight: 900;
    letter-spacing: 10px;
    text-align: center;
  }
  .section-desc {
    max-width: 600px;
    padding: 0 10px;
    font-size: 20px;
    font-weight: 700;
    text-align: center;
  }
  @media screen and (max-width: 400px){
     .section-title {
       font-size: 30px
     }
     .section-desc {
       font-size: 16px;
       max-width: 200px;
     }
  }
</style>
