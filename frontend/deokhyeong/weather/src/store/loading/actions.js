const turnOnLoading = async ({ commit }) => {
  commit(
    'setLoadingStatus',
    { isLoading: true },
  )
}

const turnOffLoading = async ({ commit }) => {
  commit(
    'setLoadingStatus',
    { isLoading: false },
  )
}

export default {
  turnOnLoading,
  turnOffLoading,
}
