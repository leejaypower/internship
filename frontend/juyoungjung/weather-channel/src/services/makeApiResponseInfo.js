const makeApiResponseInfo = (type, desc, code) => ({
  type,
  text: `${desc} ${code}`,
  visible: true,
})

export default makeApiResponseInfo
