<template>
  <v-app>
    <RouterView />
  </v-app>
</template>

<script>
export default {
  name: 'App',
}
</script>
<style lang="scss" scoped>

.v-toolbar__content {
  flex-direction: column;
}

.sidebar_wrapper {
  padding: 24px;
}
</style>
