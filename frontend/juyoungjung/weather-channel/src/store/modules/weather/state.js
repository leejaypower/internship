const state = () => ({
  currentCoords: null,
  currentLocation: '',
  oneCallApiCurrentData: null,
  oneCallApiHourlyData: [],
  oneCallApiDailyData: [],
  forecastHourlyDayType: [],
  forecastHourlyInfo: {
    temperature: [],
    wind: [],
    rain: [],
  },
  forecastDailyInfo: {
    temperature: [],
    wind: [],
    rain: [],
  },
})

export default state
