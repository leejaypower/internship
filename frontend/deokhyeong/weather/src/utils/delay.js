const delay = (promise, s) => {
  const seconds = s * 1000

  return new Promise((resolve) => {
    setTimeout(() => resolve(promise), seconds)
  })
}

export default delay
