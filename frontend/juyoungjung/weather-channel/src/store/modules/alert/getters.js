const getters = {
  userApiResponse(state) {
    return state.userApiResponse
  },
  userApiResponseText(state) {
    return state.userApiResponse.text
  },
  weatherApiResponse(state) {
    return state.weatherApiResponse
  },
  weatherApiResponseText(state) {
    return state.weatherApiResponse.text
  },
}

export default getters
