<template>
  <h1>{{title}}</h1>
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
  components: {},
  data() {
    return {
      sampleDate: '',
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  update() {},
  beforeUnmount() {},
  unmounted() {},
  methods: {},
}
</script>
