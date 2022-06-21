<template>
  <v-bottom-navigation
    v-model="value"
    color="primary"
    class="elevation-0"
    grow
  >
    <v-btn
      value="/forecast-detail/table"
      outlined
      height="100%"
      @click="switchView('table')"
    >
      <span class="subtitle-1 font-weight-bold">
        테이블
      </span>
    </v-btn>
    <v-btn
      value="/forecast-detail/graph"
      outlined
      height="100%"
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
    }
  },
  methods: {
    switchView(to) {
      this.$router.replace(`/forecast-detail/${to}/${this.date}`)
    },
  },
}
</script>
