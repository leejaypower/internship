import { callReverseGeocode } from '@/utils/callAPI'

const getReverseGeocode = async (lat, lon) => {
  const response = await callReverseGeocode(lat, lon)
  const addrSet = response.data.results[0].region
  const result = `${addrSet.area2.name} ${addrSet.area3.name}`
  return result
}

export default getReverseGeocode
