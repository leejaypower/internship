const emailValidation = (email) => {
  // eslint-disable-next-line no-useless-escape
  const reggex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const isPass = reggex.test(email)

  return isPass
}

const passwordValidaion = (password) => {
  const reggex = /(?=.*\d)(?=.*[a-zA-Z]).{6,}/
  const isPass = reggex.test(password)

  return isPass
}

export default {
  emailValidation,
  passwordValidaion,
}
