import axios from 'axios'

const CLIENT_ID = process.env.VUE_APP_NAVER_API_CLIENT_ID
const CLIENT_SECRET = process.env.VUE_APP_CLIENT_SECRET

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'http://localhost:8090' : 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
    'X-NCP-APIGW-API-KEY-ID': CLIENT_ID,
    'X-NCP-APIGW-API-KEY': CLIENT_SECRET,
  },
})

/**
 *
 * @see {@link fetchOneCallApi} AI·NAVER Reverse Geocoding API 문서
 * @see {@link https://api.ncloud-docs.com/docs/ai-naver-mapsreversegeocoding-gc}
 */
const getLocationNameByCoords = async ({ longitude, latitude }) => {
  const coords = `${longitude},${latitude}`

  const response = await api.get('/map-reversegeocode/v2/gc', {
    params: {
      coords,
      output: 'json',
      orders: 'admcode',
    },
  })
  return response
}

/**
 *
 * @see {@link fetchOneCallApi} AI·NAVER Geocoding API 문서
 * @see {@link https://api.ncloud-docs.com/docs/ai-naver-mapsgeocoding-geocode}
 */
const getLocationCoordsByAddress = async (query) => {
  const response = await api.get('/map-geocode/v2/geocode', {
    params: {
      query,
    },
  })

  return response
}

const naverOpenApi = {
  getLocationNameByCoords,
  getLocationCoordsByAddress,
}

export default naverOpenApi
