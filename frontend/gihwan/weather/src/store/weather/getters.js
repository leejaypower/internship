export default {
  currentCoords(state) {
    return state.currentLocation.coord
  },
  currentName(state) {
    return state.currentLocation.coord.name
  },
  currentData(state) {
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
  locationCoord(state) {
    return state.location.coord
  },
  locationData(state) {
    return state.location.weatherData
  },
  weatherBookmarks(state) {
    return state.bookmarks
  },
}
