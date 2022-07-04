import { callGeocodeByQuery } from '@/utils/callAPI'
import { customErrorMaker } from '../errorHandling'

const getGeocode = async (query) => {
  const response = await callGeocodeByQuery(query)

  if (!response.data.addresses[0]) {
    const { stack } = new Error()
    const newError = customErrorMaker({
      errorName: 'customError_naverGeoCode',
      requestInfo: response,
      message: 'Invalid Query',
      stack,
    })

    const errorReason = JSON.stringify(newError)

    throw new Error(errorReason)
  }

  const fullAddress = response.data.addresses[0].roadAddress
  const coordinate = {
    lat: response.data.addresses[0].y,
    lon: response.data.addresses[0].x,
  }

  return { fullAddress, coordinate }
}

export default getGeocode
