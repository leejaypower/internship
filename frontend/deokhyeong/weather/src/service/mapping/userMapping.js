const userMapping = (mapTarget) => ({
  userId: mapTarget.id,
  email: mapTarget.email,
  password: mapTarget.password,
  expire: mapTarget.expire,
  refreshExpire: mapTarget.refreshExpire,
  level: mapTarget.level,
  bookmarkLocations: mapTarget.bookmarkLocations,
  selectedLocation: mapTarget.selectedLocation,
})

export default userMapping
