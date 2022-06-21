import axios from 'axios'

const callReverseGeocode = async (lat, lon) => {
  const config = {
    params: {
      request: 'coordsToaddr',
      coords: `${lon},${lat}`,
      sourcecrs: 'epsg:4326',
      orders: 'roadaddr',
      output: 'json',
    },
    headers: {
      'X-NCP-APIGW-API-KEY-ID': process.env.VUE_APP_X_NCP_APIGW_API_KEY_ID,
      'X-NCP-APIGW-API-KEY': process.env.VUE_APP_X_NCP_APIGW_API_KEY,
    },
  }
  const response = await axios.get('/map-reversegeocode/v2/gc', config)

  return response
}

export default callReverseGeocode
