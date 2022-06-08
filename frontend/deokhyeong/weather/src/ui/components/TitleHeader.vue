<template>
  <div
    class="d-flex pb-4"
    :class="headerClass"
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
    headerClass() {
      const result = `justify-${this.justify || 'center'} `
      return {
        [result]: true,
      }
    },
  },
}
</script>
