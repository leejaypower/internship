const getWeatherIconUrl = (icon, size = '2x') => {
  if (!icon) {
    return ''
  }

  return `http://openweathermap.org/img/wn/${icon}@${size}.png`
}
export default getWeatherIconUrl
