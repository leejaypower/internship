// 날씨 api 활용
// 다음주차부터 활용될 util입니다.
import axios from 'axios'

const MY_API_KEY = '419670dccf136242228a0ffe5dc4c65d'

async function testAPI() {
  const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=30&lon=30&appid=${MY_API_KEY}`)
  return weather
}

const weather = {
  testAPI,
}

export default weather
