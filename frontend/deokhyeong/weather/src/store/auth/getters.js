const userId = (state) => state.userId
const email = (state) => state.email
const password = (state) => state.password
const expire = (state) => state.expire
const refreshExpire = (state) => state.refreshExpire
const level = (state) => state.level
const bookmarkLocations = (state) => state.bookmarkLocations
const selectedLocation = (state) => state.selectedLocation
const currentLocation = (state) => state.currentLocation
const defaultLocation = (state) => state.defaultLocation

// eslint-disable-next-line max-len
const priorityLocation = (state) => state.selectedLocation || state.currentLocation || state.defaultLocation

export default {
  userId,
  email,
  password,
  expire,
  refreshExpire,
  level,
  bookmarkLocations,
  selectedLocation,
  currentLocation,
  defaultLocation,
  priorityLocation,
}
