import fakeHttp from '@/lib/fakeHttp'
import naverHttp from '@/lib/naverHttp'
import locationHttp from '@/lib/locationHttp'

// api 통신이라 가정한 코드
const getKoreaAdministrativeDistrict = () => locationHttp.get('data/korea-administrative-district.json')

// api 통신이라 가정한 코드
const getSigunguLocation = () => locationHttp.get('data/sigungu.json')

const addLocation = (locationData) => fakeHttp.post('/location/add', locationData)

const deleteLocation = (locationData) => fakeHttp.post('/location/delete', locationData)

const selectLocation = (locationData) => fakeHttp.post('/location/select', locationData)

const initLocation = () => fakeHttp.post('/location/init')

/**
 *
 * @param {{coords : string}} locationData  `${lat},${long}`의 string형태
 */
const getLocationInfo = (locationData) => naverHttp.get('/map-reversegeocode/v2/gc', {
  params: {
    ...locationData,
    output: 'json',
    orders: 'admcode',
  },
})

export default {
  getKoreaAdministrativeDistrict,
  getSigunguLocation,
  addLocation,
  deleteLocation,
  selectLocation,
  initLocation,
  getLocationInfo,
}
