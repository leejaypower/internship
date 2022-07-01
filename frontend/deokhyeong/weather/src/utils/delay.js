const delay = (value, s) => {
  const seconds = s * 1000

  return new Promise((resolve) => {
    setTimeout(() => resolve(value), seconds)
  })
}

export default delay
