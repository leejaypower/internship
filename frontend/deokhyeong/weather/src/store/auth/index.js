import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const auth = {
  namespaced: true,
  state: {
    userId: '',
    email: '',
    password: '',
    expire: '',
    refreshExpire: '',
    level: '',
    bookmarkLocations: [],
    selectedLocation: null,
    currentLocation: null,
    defaultLocation: {
      location: '서울특별시/강남구',
      lat: '37.5166953',
      long: '127.0382923',
    },
  },
  getters,
  mutations,
  actions,
}

export default auth
