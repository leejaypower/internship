import isValidLongitude from './isValidLongitude'

const checkValidationCause = (longitude) => {
  if (!isValidLongitude(longitude)) {
    return '경도'
  }

  return '위도'
}

export default checkValidationCause
