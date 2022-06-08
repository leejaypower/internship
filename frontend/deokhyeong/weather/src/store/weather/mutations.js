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

export default {
  setCurrentWeather,
  setCurrentAirPollution,
}
