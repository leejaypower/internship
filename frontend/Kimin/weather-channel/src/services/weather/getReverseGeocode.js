import { callReverseGeocode } from '@/utils/callAPI'

const getReverseGeocode = async (lat, lon) => {
  const response = await callReverseGeocode(lat, lon)
  const addressArr = response.data.results[0].region
  const result = `${addressArr.area2.name} ${addressArr.area3.name}`
  return result
}

export default getReverseGeocode
