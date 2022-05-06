const switchErrorReturn = (error) => {
  switch (error.message) {
    case 'exit':
      return console.log('의도적인 함수 끝내기')
    default:
      return console.log(error)
  }
}

export const catchError = (...callbacks) => {
  try {
    callbacks.forEach((callback) => callback())
  } catch (error) {
    switchErrorReturn(error)
  }
}
