const isValidCoords = ({ longitude, latitude }) => {
  if (longitude < -90 && longitude > 90) {
    return false
  }

  if (latitude < -180 && latitude > 180) {
    return false
  }

  return true
}

export default isValidCoords
