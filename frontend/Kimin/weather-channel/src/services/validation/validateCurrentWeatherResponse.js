import { customErrorMaker } from '@/services/errorHandling'

export default function validateCurrentWeatherResponse(weather) {
  const weatherData = weather?.data
  const hasTemp = weatherData?.main?.temp !== undefined
  const hasWind = weatherData?.wind?.speed !== undefined
  const hasClouds = weatherData?.clouds?.all !== undefined

  if (!hasTemp || !hasWind || !hasClouds) {
    const newError = customErrorMaker({
      errorName: 'INSUFFICIENT_OPENWEATHER_RESPONSE',
      message: 'Insufficient Response',
      requestInfo: weather,
    })

    const errorMessage = JSON.stringify(newError)

    throw new Error(errorMessage)
  }
}
