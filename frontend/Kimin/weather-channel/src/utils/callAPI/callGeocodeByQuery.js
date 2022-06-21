import axios from 'axios'

const callGeocode = async (query) => {
  const response = await axios.get('/map-geocode/v2/geocode', {
    params: {
      query,
    },
    headers: {
      'X-NCP-APIGW-API-KEY-ID': process.env.VUE_APP_X_NCP_APIGW_API_KEY_ID,
      'X-NCP-APIGW-API-KEY': process.env.VUE_APP_X_NCP_APIGW_API_KEY,
    },
  })

  return response
}

export default callGeocode
