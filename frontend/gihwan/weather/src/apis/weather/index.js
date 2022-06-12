import { axios } from '@/lib'

const getWeahterDataFetch = (coord) => {
  const { lat, lon } = coord
  const result = axios.weather({ params: { lat, lon } })
  return result
}

const getLocationName = (coord) => {
  const { lat, lon } = coord
  const result = axios.naver({ params: { coords: `${lon},${lat}` } })
  return result
}

export { getWeahterDataFetch, getLocationName }
