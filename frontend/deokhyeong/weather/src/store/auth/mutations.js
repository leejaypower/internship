const setAuthData = (state, user) => {
  state.userId = user.userId
  state.email = user.email
  state.password = user.password
  state.expire = user.expire
  state.refreshExpire = user.refreshExpire
  state.level = user.level
  state.bookmarkLocations = user.bookmarkLocations || []
  state.selectedLocation = user.selectedLocation
}

const setLocationData = (state, user) => {
  state.bookmarkLocations = user.bookmarkLocations || []
  state.selectedLocation = user.selectedLocation
}

const setBookmarkLocationsData = (state, user) => {
  state.bookmarkLocations = user.bookmarkLocations || []
}

export default {
  setAuthData,
  setLocationData,
  setBookmarkLocationsData,
}
