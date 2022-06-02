import isExpiredTime from './isExpiredTime'
import validations from './validations'
import delay from './delay'
import deepClone from './deepClone'

export default {
  ...validations,
  isExpiredTime,
  delay,
  deepClone,
}
