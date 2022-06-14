import { axios } from '@/lib'

const getWeahterDataFetch = (coord) => {
  const { lat, lon } = coord
  const result = axios.weather({ params: { lat, lon } })
  return result
}

const getBookmarkDataFetch = (coord) => {
  const { lat, lon } = coord
  const result = axios.weather({ params: { lat, lon, exclude: 'minutely,hourly,daily,alerts' } })
  return result
}

const getLocationName = (coord) => {
  const { lat, lon } = coord
  const result = axios.naver({ params: { coords: `${lon},${lat}` } })
  return result
}

export { getWeahterDataFetch, getBookmarkDataFetch, getLocationName }
