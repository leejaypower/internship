import axios from 'axios'

const CLIENT_KEY = process.env.VUE_APP_NAVER_CLIENT_KEY
const CLIENT_SECRET_KEY = process.env.VUE_APP_NAVER_SECRET_KEY

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'http://localhost:8088' : 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
    'X-NCP-APIGW-API-KEY-ID': CLIENT_KEY,
    'X-NCP-APIGW-API-KEY': CLIENT_SECRET_KEY,
  },
})

async function fetchMyAddress(lat, lon) {
  const response = await instance.get('/map-reversegeocode/v2/gc', {
    params: {
      coords: `${lon}, ${lat}`,
      output: 'json',
      orders: 'roadaddr',
    },
  })
  return response
}

export default fetchMyAddress
