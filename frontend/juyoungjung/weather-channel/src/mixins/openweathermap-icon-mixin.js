const openWeatherMapIconMixin = {
  methods: {
    $_makeIconUrl(icon) {
      return `http://openweathermap.org/img/wn/${icon}@2x.png`
    },
  },
}

export default openWeatherMapIconMixin
