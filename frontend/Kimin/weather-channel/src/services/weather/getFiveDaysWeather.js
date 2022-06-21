import { callFiveDaysWeather } from '@/utils/callAPI'
import moment from 'moment'
import { toFixedAsFirst } from '@/utils'

const makeTimeSeriesDataByProperty = (multiDaysWeatherArr) => {
  const result = {
    temp: [],
    rain: [],
    clouds: [],
    time: [],
    rawTime: [],
  }

  multiDaysWeatherArr.forEach((eachDayWeather) => {
    const timeStamp = eachDayWeather.dt * 1000
    const dateAndHours = moment(timeStamp).format('DD일 HH시')

    result.rawTime.push(timeStamp)
    result.time.push(dateAndHours)

    const temperature = toFixedAsFirst(eachDayWeather.main.temp)
    result.temp.push(temperature)

    const rainfall = eachDayWeather.rain ? eachDayWeather.rain['3h'] : 0
    result.rain.push(rainfall)

    result.clouds.push(eachDayWeather.clouds.all)
  })

  return result
}

/**
 * openWeather.org API의 120시간 날씨데이터를 받아 그래프 2종을 그리기위한 2가지 배열을 반환함
 * @param {String || Number} lattitude, 위도
 * @param {String || Number} longitude, 경도
 * @returns 현재부터 24시의 3시간단위 날씨객체 배열 & 5일간의 정오단위 날씨객체 배열
 */
const getFiveDaysWeather = async (lat, lon) => {
  const response = await callFiveDaysWeather(lat, lon)
  const weatherList = response.data.list // 3시간단위의 날씨정보 40개의 배열을 API response로 제공받음

  const multiDaysWeather = [] // 향후 24시간을 그래프를 위한 자료배열
  const multiTimeWeather = [] // 오늘포함 5일간에 대한 그래프를 위한 자료배열

  for (let i = 0; i < weatherList.length; i += 1) {
    if (i < 8) { // index 0~7까지가 현재로부터 향후 24시간을 체크하기위한 포인트임(해당자료가 3시간단위 자료들의 40번째까지의 배열)
      multiTimeWeather.push(weatherList[i])
    }

    const hours = new Date(weatherList[i].dt * 1000).getHours() // timeStamp를 한국시간으로 환산함
    if (hours === 12) { // 5일간의 온도를 그래프로 표현하기위해, 12시를 하루의 대표온도로서 취발하여 사용하고자함
      multiDaysWeather.push(weatherList[i])
    }
  }

  const fiveDaysWeather = makeTimeSeriesDataByProperty(multiDaysWeather)
  const oneDayWeather = makeTimeSeriesDataByProperty(multiTimeWeather)

  return { fiveDaysWeather, oneDayWeather }
}

export default getFiveDaysWeather
