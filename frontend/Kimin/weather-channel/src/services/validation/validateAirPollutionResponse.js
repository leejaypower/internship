export default function validateAirPollutionResponse(air) {
  const airQualityIndex = air?.data?.list[0]?.main?.aqi
  const hasAirQualityIndex = !!airQualityIndex

  if (!hasAirQualityIndex) {
    throw new Error('no necessary element')
  }
}
