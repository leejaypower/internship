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
  responseApiInfo: {
    type: 'info',
    text: '',
    visible: false,
  },
})

export default state
