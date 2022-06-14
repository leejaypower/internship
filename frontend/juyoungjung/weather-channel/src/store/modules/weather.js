/* eslint-disable no-shadow */
import { openWeatherApi, naverOpenApi } from '@/api'
import {
  SET_CURRENT_REGION_INFO,
  SET_RESPONSE_ERROR_INFO,
  RESET_RESPONSE_ERROR_INFO,
  SET_ONE_CALL_API_DATA,
  SET_CURRENT_COORDS,
  SET_SEARCH_COORDS,
} from '@/constants/mutation-types'
import weatherDescKo from '@/data/weatherDescKo'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import isValidCoords from '@/services/isValidCoords'
import makeApiErrorInfo from '@/services/makeApiErrorInfo'
import makeWeatherDataToFixedOne from '@/services/makeWeatherDataToFixedOne'

dayjs.locale('ko')

const state = () => ({
  currentCoords: null,
  currentRegionInfo: null,
  oneCallApiData: [],
  responseErrorInfo: {
    type: 'info',
    text: null,
    visible: false,
  },
})

const getters = {
  simpleCurrentWeatherData(state) {
    let result = {}
    const data = state.oneCallApiData.current

    if (data) {
      const createDayjsObjectByUnixTimestamp = dayjs.unix(data.dt)

      result = {
        date: createDayjsObjectByUnixTimestamp.format('YYYY.MM.DD'),
        day: createDayjsObjectByUnixTimestamp.format('dddd'),
        time: createDayjsObjectByUnixTimestamp.format('A hh:mm'),
        desc: weatherDescKo[data.weather[0].id],
        icon: data.weather[0].icon,
        temp: `${makeWeatherDataToFixedOne(data.temp)}°C`,
        feels_like: `${makeWeatherDataToFixedOne(data.feels_like)}°C`,
        humidity: `${data.humidity}%`,
        wind_speed: `${data.wind_speed}m/s`,
        clouds: `${data.clouds}%`,
        rain: data.rain ? `${data.rain['1h']}mm/h` : null,
        snow: data.snow ? `${data.snow['1h']}mm/h` : null,
      }
    }

    return result
  },
  forecastDaily4DaysData(state) {
    if (!state.oneCallApiData.daily) {
      return null
    }

    const daily = [...state.oneCallApiData.daily]

    const filterDailyData = daily.filter((data, idx) => {
      const forecast4Days = idx < 4

      if (forecast4Days) {
        return data
      }

      return null
    })

    const result = filterDailyData.map((data) => {
      const createDayjsObjectByUnixTimestamp = dayjs.unix(data.dt)

      return ({
        key: createDayjsObjectByUnixTimestamp.format('DD'),
        date: createDayjsObjectByUnixTimestamp.format('DD(dd)'),
        icon: data.weather[0].icon,
        temp: `${makeWeatherDataToFixedOne(data.temp.day)}°C`,
        feels_like: `${makeWeatherDataToFixedOne(data.feels_like.day)}°C`,
        rain: data.rain ? `${data.rain}mm/h` : null,
      })
    })

    return result
  },
  forecastDaily7DaysData(state) {
    if (!state.oneCallApiData.daily) {
      return null
    }

    const daily = [...state.oneCallApiData.daily]

    const result = daily.map((data) => {
      const createDayjsObjectByUnixTimestamp = dayjs.unix(data.dt)

      return ({
        key: createDayjsObjectByUnixTimestamp.format('DD'),
        date: createDayjsObjectByUnixTimestamp.format('YYYY.MM.DD'),
        day: createDayjsObjectByUnixTimestamp.format('DD(dd)'),
        hour: `${createDayjsObjectByUnixTimestamp.format('A hh')}시`,
        icon: data.weather[0].icon,
        temp: `${makeWeatherDataToFixedOne(data.temp.day)}°C`,
        feels_like: `${makeWeatherDataToFixedOne(data.feels_like.day)}°C`,
        rain: data.rain ? `${data.rain}mm/h` : null,
        clouds: `${data.clouds}%`,
        humidity: `${data.humidity}%`,
        uvi: `${data.uvi}`,
        wind: `${data.wind_speed}m/s`,
      })
    })

    return result
  },
  simpleForecastDaily7DaysData(state) {
    if (!state.oneCallApiData.daily) {
      return null
    }

    const daily = [...state.oneCallApiData.daily]

    const result = daily.map((data) => {
      const createDayjsObjectByUnixTimestamp = dayjs.unix(data.dt)

      return ({
        key: createDayjsObjectByUnixTimestamp.format('DD'),
        day: createDayjsObjectByUnixTimestamp.format('DD(dd)'),
        icon: data.weather[0].icon,
        temp: `${makeWeatherDataToFixedOne(data.temp.day)}°C`,
      })
    })

    return result
  },
  forecastHourlyData(state) {
    if (!state.oneCallApiData.hourly) {
      return null
    }

    const hourly = [...state.oneCallApiData.hourly]

    const result = hourly.map((data) => {
      const createDayjsObjectByUnixTimestamp = dayjs.unix(data.dt)

      return ({
        key: createDayjsObjectByUnixTimestamp.format('hh'),
        date: createDayjsObjectByUnixTimestamp.format('YYYY.MM.DD'),
        day: createDayjsObjectByUnixTimestamp.format('(dd)'),
        hour: `${createDayjsObjectByUnixTimestamp.format('A hh')}시`,
        icon: data.weather[0].icon,
        temp: `${makeWeatherDataToFixedOne(data.temp)}°C`,
        feels_like: `${makeWeatherDataToFixedOne(data.feels_like)}°C`,
        rain: data.rain ? `${data.rain['1h']}mm/h` : null,
        clouds: `${data.clouds}%`,
        humidity: `${data.humidity}%`,
        uvi: `${data.uvi}`,
        wind: `${data.wind_speed}m/s`,
      })
    })

    return result
  },
  currentLocation(state) {
    return state.currentRegionInfo
  },
  currentCoords(state) {
    return state.currentCoords
  },
  responseErrorInfo(state) {
    return state.responseErrorInfo
  },
  responseErrorInfoMessage(state) {
    return state.responseErrorInfo.text
  },
}

const actions = {
  setCurrentCoords({ commit }, payload) {
    if (!isValidCoords(payload)) {
      const info = makeApiErrorInfo(
        '현재 위치의 좌표값이 잘못된 것으로 확인되었습니다.',
        '관리자에게 문의해주세요.',
      )

      return commit(SET_RESPONSE_ERROR_INFO, info)
    }

    return commit(SET_CURRENT_COORDS, payload)
  },
  async getOneCallApi({ commit }, payload) {
    if (!isValidCoords(payload)) {
      const info = makeApiErrorInfo(
        '잘못된 좌표값으로는 현재 날씨 정보를 가져올 수 없습니다.',
        '관리자에게 문의해주세요.',
      )

      return commit(SET_RESPONSE_ERROR_INFO, info)
    }

    try {
      const response = await openWeatherApi.fetchOneCallApi(payload)

      return commit(SET_ONE_CALL_API_DATA, response)
    } catch (error) {
      const info = makeApiErrorInfo(
        '일일 예보 데이터를 가져오는 도중 문제가 발생했습니다. 관리자에게 문의해주세요.',
        error.code,
      )

      return commit(SET_RESPONSE_ERROR_INFO, info)
    }
  },
  async getLocationName({ commit }, payload) {
    if (!isValidCoords(payload)) {
      const info = makeApiErrorInfo(
        '잘못된 좌표값으로는 현재 위치를 가져올 수 없습니다.',
        '관리자에게 문의해주세요.',
      )

      return commit(SET_RESPONSE_ERROR_INFO, info)
    }

    try {
      const response = await naverOpenApi.getLocationNameByCoords(payload)
      const { region } = response.data.results[0]
      const locationName = `${region.area1.name} ${region.area2.name} ${region.area3.name}`

      return commit(SET_CURRENT_REGION_INFO, locationName)
    } catch (error) {
      const info = makeApiErrorInfo(
        '현재 위치의 행정동 이름을 가져오는 도중 문제가 발생했습니다.',
        error.code,
      )

      return commit(SET_RESPONSE_ERROR_INFO, info)
    }
  },
  async getLocationCoords({ commit, dispatch }, payload) {
    try {
      const response = await naverOpenApi.getLocationCoordsByAddress(payload)

      if (response.data.addresses.length === 0) {
        const info = makeApiErrorInfo(
          '날씨 정보를 가져올 수 없는 주소입니다.',
          '해당 지역의 좌표가 현재 사이트에서 사용하고 있는 다음 우편번호 서비스에 등록되지 않아 날씨 정보를 조회할 수 없습니다.',
        )

        commit(SET_RESPONSE_ERROR_INFO, info)
      } else {
        const longitude = response.data.addresses[0].x
        const latitude = response.data.addresses[0].y

        commit(SET_SEARCH_COORDS, { longitude, latitude })
        await dispatch('getLocationName', { longitude, latitude })
        await dispatch('getOneCallApi', { longitude, latitude })
      }

      return null
    } catch (error) {
      const info = makeApiErrorInfo(
        '검색한 주소의 좌표를 가져오는 도중 문제가 발생했습니다.',
        error.code,
      )

      return commit(SET_RESPONSE_ERROR_INFO, info)
    }
  },
  setResponseErrorInfo({ commit }, payload) {
    commit(SET_RESPONSE_ERROR_INFO, payload)
  },
  resetResponseInfo({ commit }) {
    const info = {
      type: 'info',
      text: null,
      visible: false,
    }

    commit(RESET_RESPONSE_ERROR_INFO, info)
  },
}

const mutations = {
  [SET_CURRENT_COORDS](state, payload) {
    state.currentCoords = payload
  },
  [SET_SEARCH_COORDS](state, payload) {
    const { longitude, latitude } = payload
    state.currentCoords = { longitude, latitude }
  },
  [SET_ONE_CALL_API_DATA](state, payload) {
    state.oneCallApiData = payload.data
  },
  [SET_CURRENT_REGION_INFO](state, payload) {
    state.currentRegionInfo = payload
  },
  [SET_RESPONSE_ERROR_INFO](state, payload) {
    state.responseErrorInfo = payload
  },
  [RESET_RESPONSE_ERROR_INFO](state, payload) {
    state.responseErrorInfo = payload
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
