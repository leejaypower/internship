import { getLocationName, getBookmarkDataFetch, getWeahterDataFetch } from '@/apis/weather'
import { alert } from '@/lib'
import getCurrentLocation from '@/utils/geolocation'

export default {
  updateCurrentName({ commit }, payload) {
    const { name, number1 } = payload.land
    const { area1, area2 } = payload.region
    const currenName = `${area1.name} ${area2.name} ${name} ${number1}`
    commit('updateCurrentName', { name: currenName })
  },
  async defaultLocationUpdate({ getters, commit }) {
    try {
      const result = await getWeahterDataFetch(getters.currentCoords)
      const { current, daily, hourly } = result.data
      commit('updateCurrentWeatherData', { current, daily, hourly })
    } catch ({ errorMessage }) {
      const { title, desc } = errorMessage
      alert.error(title, desc)
    }
  },
  async currentLocationUpdate({ commit, dispatch }) {
    const fetchs = (coords) => [getWeahterDataFetch(coords), getLocationName(coords)]
    try {
      const currentCoord = await getCurrentLocation()
      commit('updateCurrentCoord', currentCoord)
      const settledResult = await Promise.allSettled(fetchs(currentCoord))
      const isReject = settledResult.filter((result) => result.status === 'rejected')[0]
      if (isReject) {
        throw isReject.reason
      }
      const { current, daily, hourly } = settledResult[0].value.data
      commit('updateCurrentWeatherData', { current, daily, hourly })
      const { land, region } = settledResult[1].value.data.results[0]
      const { name, number1 } = land
      const { area1, area2 } = region
      const currenName = `${area1.name} ${area2.name} ${name} ${number1}`
      commit('updateCurrentName', { name: currenName })
    } catch (error) {
      const { title, desc } = error.errorMessage
      alert.error(title, desc)
      dispatch('defaultLocationUpdate')
    }
  },
  async locationGetData({ commit }, payload) {
    const { coords, name } = payload
    try {
      const { data } = await getWeahterDataFetch(coords)
      commit('updateLocationCoord', { ...coords, name })
      commit('updateLocationData', data)
    } catch ({ errorMessage }) {
      const { title, desc } = errorMessage
      alert.error(title, desc)
    }
  },
  async updateBookmarksData({ commit }, payload) {
    const promises = payload.map(({ coords }) => getBookmarkDataFetch({
      lat: coords.lat,
      lon: coords.lon,
    }))
    try {
      const result = await Promise.allSettled(promises)
      const res = result.map(({ status, value }, i) => {
        const { idx, title, coords } = payload[i]
        if (status === 'fulfilled') {
          return {
            idx, title, name: coords.name, data: value.data.current,
          }
        }
        alert.error('통신 에러', '통신을 실패했습니다.')
        return {
          idx, title, name: coords.name, data: null,
        }
      })
      commit('updateBookmarksData', res)
    } catch ({ errorMessage }) {
      const { title, desc } = errorMessage
      alert.error(title, desc)
    }
  },
  async updateBookmark({ commit }, payload) {
    const { idx, coords } = payload
    try {
      const result = await getBookmarkDataFetch(coords)
      commit('updateBookmark', { idx, result })
    } catch ({ errorMessage }) {
      const { title, desc } = errorMessage
      alert.error(title, desc)
    }
  },
  removeBookmark({ commit }, payload) {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    const newBookmarks = bookmarks.filter(({ idx }) => idx !== payload)
    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks))
    commit('removeBookmark', payload)
  },
  updateBookmarkName({ commit }, payload) {
    const { idx, value } = payload
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    const idxIndex = bookmarks.findIndex((bookmark) => bookmark.idx === idx)
    bookmarks[idxIndex].title = value
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    commit('updateBookmarkName', payload)
  },
}
