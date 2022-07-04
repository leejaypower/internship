import { customErrorMaker } from '@/services/errorHandling'

export default function validateCoordinates(lat, lon) {
  const isValidLatitude = !!lat && Number(lat) >= 0 && Number(lat) <= 90
  const isValidLongitude = !!lon && Number(lon) >= -180 && Number(lon) <= 180

  if (!isValidLatitude || !isValidLongitude) {
    const { stack } = new Error()
    const newError = customErrorMaker({
      errorName: 'INVALID COORDINATES',
      message: 'Invalid Coordinates',
      stack,
    })

    const errorMessage = JSON.stringify(newError)

    throw new Error(errorMessage)
  }
}
