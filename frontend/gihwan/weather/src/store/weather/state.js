const state = () => ({
  currentLocation: {
    coord: {
      lat: 37.5168808,
      lon: 127.0383133,
      name: '서울특별시 강남구 언주로134길 32',
    },
    weatherData: {
      current: {},
      daily: [],
      hourly: [],
    },
    isWeatherFetchResult: false,
  },
  location: {
    coord: null,
    weatherData: {
      current: null,
      daily: null,
      hourly: null,
    },
  },
})

export default state
