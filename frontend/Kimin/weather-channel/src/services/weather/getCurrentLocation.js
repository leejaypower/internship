import { callCurrentLocation } from '@/utils/callAPI'
import { customErrorMaker } from '@/services/errorHandling'

const getCurrentLocation = async () => {
  const { stack } = new Error()
  try {
    const coordinates = await callCurrentLocation()
    return coordinates
  } catch (error) {
    const newError = customErrorMaker({
      errorName: 'NAVIGATOR ERROR',
      message: 'Navigator Error',
      stack,
    })

    const errorReason = JSON.stringify(newError)
    throw new Error(errorReason)
  }
}

export default getCurrentLocation
