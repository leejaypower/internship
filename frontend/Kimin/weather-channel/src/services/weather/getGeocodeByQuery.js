import { callGeocodeByQuery } from '@/utils/callAPI'

const getGeocode = async (query) => {
  const response = await callGeocodeByQuery(query)

  if (!response.data.addresses[0]) {
    throw new Error('Invalid Query')
  }

  const fullAddress = response.data.addresses[0].roadAddress
  const coordinate = {
    lat: response.data.addresses[0].y,
    lon: response.data.addresses[0].x,
  }

  return { fullAddress, coordinate }
}

export default getGeocode
