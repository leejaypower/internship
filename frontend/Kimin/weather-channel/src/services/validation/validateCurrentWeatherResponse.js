export default function validateCurrentWeatherResponse(weather) {
  const weatherData = weather?.data
  const hasTemp = weatherData?.main?.temp !== undefined
  const hasWind = weatherData?.wind?.speed !== undefined
  const hasClouds = weatherData?.clouds?.all !== undefined

  if (!hasTemp || !hasWind || !hasClouds) {
    console.log('기민')
    throw new Error('no necessary element')
  }
}
