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

const mutations = {
  saveCurrentWeather,
  saveTempLocation,
  saveMultiDaysWeather,
  saveMultiTimeWeather,
}

export default mutations
