export default {
  currentCoords(state) {
    return state.currentLocation.coord
  },
  currentName(state) {
    return state.currentLocation.coord.name
  },
  currentDatas(state) {
    return state.currentLocation.weatherData.current
  },
  currentDailyDatas(state) {
    return state.currentLocation.weatherData.daily
  },
  currentHourlyDatas(state) {
    return state.currentLocation.weatherData.hourly
  },
  isWeatherFetchResult(state) {
    return state.currentLocation.isWeatherFetchResult
  },
}
