import { naverAxios, weatherAxios } from '@/lib/axios'

const getWeahterDataFetch = (coord) => {
  const { lat, lon } = coord
  const result = weatherAxios({ params: { lat, lon } })
  return result
}

const getLocationName = (coord) => {
  const { lat, lon } = coord
  const result = naverAxios({ params: { coords: `${lon},${lat}` } })
  return result
}

export { getWeahterDataFetch, getLocationName }
