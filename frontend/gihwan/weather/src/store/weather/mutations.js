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
  updateLocationCoord(state, payload) {
    state.location.coord = payload
  },
  updateLocationData(state, payload) {
    state.location.weatherData.current = payload.current
    state.location.weatherData.daily = payload.daily
    state.location.weatherData.hourly = payload.hourly
  },
  updateBookmarksData(state, payload) {
    payload.forEach((data) => {
      state.bookmarks.push(data)
    })
  },
  updateBookmark(state, payload) {
    const { idx, result } = payload
    const idxIndex = state.bookmarks.findIndex((bookmark) => bookmark.idx === idx)
    state.bookmarks[idxIndex].data = result.data.current
  },
  removeBookmark(state, payload) {
    const newBookmarks = state.bookmarks.filter(({ idx }) => idx !== payload)
    state.bookmarks = newBookmarks
  },
  updateBookmarkName(state, payload) {
    const { idx, value } = payload
    const idxIndex = state.bookmarks.findIndex((bookmark) => bookmark.idx === idx)
    state.bookmarks[idxIndex].title = value
  },
}
