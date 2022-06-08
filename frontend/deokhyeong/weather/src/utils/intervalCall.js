const getMillisecByTimeUnit = (timeUnit) => {
  switch (timeUnit) {
    case 'hours':
      return 1000 * 60 * 60
    case 'min':
      return 1000 * 60
    case 'sec':
    default:
      return 1000
  }
}

const intervalCall = (callback, time, timeUnit) => {
  const millisec = getMillisecByTimeUnit(timeUnit)
  const intervalTime = time * millisec

  return setInterval(callback, intervalTime)
}

export default intervalCall
