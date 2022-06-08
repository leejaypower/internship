const locationMappingForBrowserAPI = (mapTarget) => ({
  location: '현재 위치',
  lat: mapTarget?.latitude,
  long: mapTarget?.longitude,
})

export default locationMappingForBrowserAPI
