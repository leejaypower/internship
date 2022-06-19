<template>
  <div
    class="d-flex pb-4"
    :class="headerClass"
  >
    <h1>{{ title }}</h1>
    <h3>{{ subTitle }}</h3>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    subTitle: {
      type: String,
      default: '',
    },
    justify: {
      type: String,
      default: '',
    },
    align: {
      type: String,
      default: '',
    },
  },
  computed: {
    headerClass() {
      const result = `justify-${this.justify || 'center'} `
      return {
        [result]: true,
        'flex-column': !!this.subTitle,
        'align-center': !!this.subTitle,
      }
    },
  },
}
</script>
