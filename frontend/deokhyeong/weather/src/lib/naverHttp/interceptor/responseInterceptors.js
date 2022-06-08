const success = (response) => response

const fail = (error) => Promise.reject(error.response)

export default {
  success,
  fail,
}
