import { naverAxios, weatherAxios } from '@/lib'

const getWeahterDataFetch = (coord) => {
  const { lat, lon } = coord
  const result = weatherAxios({ params: { lat, lon } })
  return result
}

const getBookmarkDataFetch = (coord) => {
  const { lat, lon } = coord
  const result = weatherAxios({ params: { lat, lon, exclude: 'minutely,hourly,daily,alerts' } })
  return result
}

const getAlertDataFetch = () => {
  const result = weatherAxios({ params: { lat: 37.5666103, lon: 126.9783882, exclude: 'current,minutely,hourly,daily' } })
  return result
}

const getLocationName = (coord) => {
  const { lat, lon } = coord
  const result = naverAxios({ params: { coords: `${lon},${lat}` } })
  return result
}

export {
  getWeahterDataFetch, getBookmarkDataFetch, getAlertDataFetch, getLocationName,
}
