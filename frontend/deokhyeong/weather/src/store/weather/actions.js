import weatherApi from '@/service/api/weather'
import weatherMapping from '@/service/mapping/weatherMapping'

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
    // PR 290 feature-issue271 브랜치에서 catchAsync 방식을 해당 방식으로 바꾸고
    // 추가적으로 에러 핸들링 관련 메서드를 만들 수 있다면
    // 거기서 만들어서 여기에 머지 후 적용하겠습니다.
    dispatch('alert/alertOpen', {
      status: error.status,
      message: error.data.message,
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
    // PR 290 feature-issue271 브랜치에서 catchAsync 방식을 해당 방식으로 바꾸고
    // 추가적으로 에러 핸들링 관련 메서드를 만들 수 있다면
    // 거기서 만들어서 여기에 머지 후 적용하겠습니다.
    dispatch('alert/alertOpen', {
      status: error.status,
      message: error.data.message,
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
    dispatch('alert/alertOpen', {
      status: error.status,
      message: '날씨 정보를 받아오는데 실패했습니다.',
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
    dispatch('alert/alertOpen', {
      status: error.status,
      message: '날씨 정보를 받아오는데 실패했습니다.',
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
