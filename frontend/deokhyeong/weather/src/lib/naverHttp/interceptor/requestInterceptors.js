const appid = process.env.VUE_APP_OPEN_WEATHER_API_KEY

const success = (interceptConfig) => {
  const config = interceptConfig
  config.params = { ...config.params, appid }

  return config
}

const fail = (error) => Promise.reject(error)

export default {
  success,
  fail,
}
