import weatherApi from '@/service/api/weather'
import weatherMapping from '@/service/mapping/weatherMapping'
import errorDomain from '@/service/domain/error'

const currentWeatherSetting = async ({ commit, dispatch }, {
  lat, lon, lang = 'kr', units = 'metric',
}) => {
  try {
    const response = await weatherApi.getCurrentWeather({
      lat, lon, lang, units,
    })
    if (response.status === 200) {
      commit(
        'setCurrentWeather',
        weatherMapping.currentWeatherMapping(response.data),
      )
    }
    return response
  } catch (error) {
    dispatch('error/handleError', {
      errorLog: {
        type: 'api',
        status: error.status,
        originMessage: error.data?.message,
        message: errorDomain.weatherErrorMessageParser(error.data?.message),
        responseURL: error.request?.responseURL,
      },
    }, { root: true })
    return error
  }
}

const currentAirPollutionSetting = async ({ commit, dispatch }, { lat, lon }) => {
  try {
    const response = await weatherApi.getAirPollution({
      lat, lon,
    })
    if (response.status === 200) {
      commit(
        'setCurrentAirPollution',
        weatherMapping.currentAirPollutionMapping(response.data),
      )
    }
    return response
  } catch (error) {
    dispatch('error/handleError', {
      errorLog: {
        type: 'api',
        status: error.status,
        originMessage: error.data?.message,
        message: errorDomain.weatherErrorMessageParser(error.data?.message),
        responseURL: error.request?.responseURL,
      },
    }, { root: true })
    return error
  }
}

const oneWeekWeathersSetting = async ({ commit, dispatch }, {
  lat, lon, lang = 'kr', units = 'metric',
}) => {
  try {
    const response = await weatherApi.getOneWeekWeathers({
      lat, lon, lang, units,
    })
    if (response.status === 200) {
      commit(
        'setOneWeekWeathers',
        weatherMapping.oneWeekWeathersMapping(response.data),
      )
    }
    return response
  } catch (error) {
    dispatch('error/handleError', {
      errorLog: {
        type: 'api',
        status: error.status,
        originMessage: error.data?.message,
        message: errorDomain.weatherErrorMessageParser(error.data?.message, '날씨 정보를 받아오는데 실패했습니다.'),
        responseURL: error.request?.responseURL,
      },
    }, { root: true })
    return error
  }
}

const hourlyWeathersSetting = async ({ commit, dispatch }, {
  lat, lon, lang = 'kr', units = 'metric',
}) => {
  try {
    const response = await weatherApi.getHourlyWeathers({
      lat, lon, lang, units,
    })
    if (response.status === 200) {
      commit(
        'setHourlyWeathers',
        weatherMapping.hourlyWeathersMapping(response.data),
      )
    }
    return response
  } catch (error) {
    dispatch('error/handleError', {
      errorLog: {
        type: 'api',
        status: error.status,
        originMessage: error.data?.message,
        message: errorDomain.weatherErrorMessageParser(error.data?.message, '날씨 정보를 받아오는데 실패했습니다.'),
        responseURL: error.request?.responseURL,
      },
    }, { root: true })
    return error
  }
}

export default {
  currentWeatherSetting,
  currentAirPollutionSetting,
  oneWeekWeathersSetting,
  hourlyWeathersSetting,
}
