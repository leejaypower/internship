import { customErrorMaker } from '@/services/errorHandling'

export default function validateAirPollutionResponse(air) {
  const airQualityIndex = air?.data?.list[0]?.main?.aqi
  const hasAirQualityIndex = !!airQualityIndex

  if (!hasAirQualityIndex) {
    const { stack } = new Error()
    const newError = customErrorMaker({
      errorName: 'INSUFFICIENT_OPENWEATHER_RESPONSE',
      message: 'Insufficient Response',
      requestInfo: air,
      stack,
    })

    const errorMessage = JSON.stringify(newError)

    throw new Error(errorMessage)
  }
}
