const weatherMixins = {
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.mobile
    },
    cols() {
      return this.isMobile ? 12 : 6
    },
  },
  methods: {
    imageUrl(data) {
      return data.weather && `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    },
  },
}

export default weatherMixins
