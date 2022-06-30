const setErrorLogs = (state, { errorLog }) => {
  state.errorLogs = [...state.errorLogs, errorLog]
}

const clearErrorsData = (state) => {
  state.errorLogs = []
}

export default {
  setErrorLogs,
  clearErrorsData,
}
