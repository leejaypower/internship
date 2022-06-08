export default {
  updateCurrentCoord(state, payload) {
    state.currentLocation.coord.lat = payload.lat
    state.currentLocation.coord.lon = payload.lon
  },
  updateCurrentName(state, payload) {
    state.currentLocation.coord.name = payload.name
  },
  updateCurrentWeatherData(state, payload) {
    state.currentLocation.weatherData.current = payload.current
    state.currentLocation.weatherData.daily = payload.daily
    state.currentLocation.weatherData.hourly = payload.hourly
    state.currentLocation.isWeatherFetchResult = true
  },
}
