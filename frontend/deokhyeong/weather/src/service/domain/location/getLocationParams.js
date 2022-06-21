const getLocationParams = (location) => {
  if (typeof location !== 'object') {
    return null
  }

  return {
    lat: location.lat,
    lon: location.long,
  }
}

export default getLocationParams
