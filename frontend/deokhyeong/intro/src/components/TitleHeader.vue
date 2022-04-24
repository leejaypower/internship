<template>
  <h1>{{ title }}</h1>
</template>
<script>
export default {
  name: 'TitleHeader',
  props: {
    title: {
      type: String,
      default: '타이틀을 입력해주세요',
    },
  },
}
</script>

<style scoped>
  h1 {
    text-align: center;
    border-bottom: 1px solid black;
  }
</style>
