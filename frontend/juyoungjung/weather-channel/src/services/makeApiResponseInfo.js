const makeApiResponseInfo = (type, desc, code) => ({
  type,
  text: code ? `${desc} ${code}` : desc,
  visible: true,
})

export default makeApiResponseInfo
