<template>
  <div
    :class="className"
  >
    <h1>{{ title }}</h1>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    justify: {
      type: String,
      default: '',
    },
  },
  computed: {
    className() {
      const result = `d-flex justify-${this.justify || 'center'} pb-4`
      return result
    },
  },
}
</script>
