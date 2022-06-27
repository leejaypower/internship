export default function makeRadarChartData(weatherData) {
  const {
    tempScore, rainOrSnowScore, skyScore, windScore, airScore,
  } = weatherData.score
  const {
    airDescription, clouds, temp, wind, rainOrSnow, score, name,
  } = weatherData

  return {
    name,
    score,
    tempScore,
    rainOrSnowScore,
    skyScore,
    windScore,
    airScore,
    airDescription,
    clouds,
    temp,
    wind,
    rainOrSnow,
  }
}
