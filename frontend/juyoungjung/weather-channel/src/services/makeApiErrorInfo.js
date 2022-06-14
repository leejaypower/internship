const makeApiErrorInfo = (desc, code) => ({
  type: 'error',
  text: `${desc} ${code}`,
  visible: true,
})

export default makeApiErrorInfo
