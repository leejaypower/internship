export default function validateCurrentWeatherResponse(weather) {
  const weatherData = weather?.data
  const hasTemp = !!weatherData?.main?.temp
  const hasWind = !!weatherData?.wind?.speed
  const hasClouds = !!weatherData?.clouds?.all

  if (!hasTemp || !hasWind || !hasClouds) {
    throw new Error('no necessary element')
  }
}
