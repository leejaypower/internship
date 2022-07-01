<template>
  <v-bottom-navigation
    v-model="value"
    class="elevation-0"
    grow
    background-color="transparent"
  >
    <v-btn
      class="navigation-button"
      value="/forecast-detail/table"
      color="primary"
      outlined
      height="100%"
      :style="buttonBackgroundStyle"
      @click="switchView('table')"
    >
      <span class="subtitle-1 font-weight-bold">
        테이블
      </span>
    </v-btn>
    <v-btn
      class="navigation-button"
      value="/forecast-detail/graph"
      color="primary"
      outlined
      height="100%"
      :style="buttonBackgroundStyle"
      @click="switchView('graph')"
    >
      <span class="subtitle-1 font-weight-bold">
        그래프
      </span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: 'WeatherViewSwitch',
  props: {
    date: {
      type: String,
      default: '',
    },
  },
  data() {
    const currentPath = `/${this.$route.path.split('/').splice(1, 2).join('/')}`

    return {
      value: currentPath,
      buttonBackgroundStyle: {
        background: 'white',
      },
    }
  },
  methods: {
    switchView(to) {
      this.$router.replace(`/forecast-detail/${to}/${this.date}`)
    },
  },
}
</script>
