const saveTempLocation = (state, coordinate) => {
  state.tempLocation = coordinate
}

const saveCurrentWeather = (state, data) => {
  state.currentWeather = data
}

const saveMultiTimeWeather = (state, data) => {
  state.multiTimeWeather = data
}

const saveMultiDaysWeather = (state, data) => {
  state.multiDaysWeather = data
}

const saveCitiesWeatherInfo = (state, weatherInfo) => {
  state.citiesWeatherInfo = [...state.citiesWeatherInfo, ...weatherInfo]
}

const initializeMultiWeathers = (state) => {
  state.citiesWeatherInfo = []
}

const mutations = {
  saveCurrentWeather,
  saveTempLocation,
  saveMultiDaysWeather,
  saveMultiTimeWeather,
  saveCitiesWeatherInfo,
  initializeMultiWeathers,
}

export default mutations
