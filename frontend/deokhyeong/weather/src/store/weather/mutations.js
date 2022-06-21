const setCurrentWeather = (state, currentWeather) => {
  state.currentWeather = {
    ...currentWeather,
  }
}

const setCurrentAirPollution = (state, currentAirPollution) => {
  state.currentAirPollution = {
    ...currentAirPollution,
  }
}

const setOneWeekWeathers = (state, oneWeekWeathers) => {
  state.oneWeekWeathers = oneWeekWeathers
}

const setHourlyWeathers = (state, hourlyWeathers) => {
  state.hourlyWeathers = hourlyWeathers
}

export default {
  setCurrentWeather,
  setCurrentAirPollution,
  setOneWeekWeathers,
  setHourlyWeathers,
}
