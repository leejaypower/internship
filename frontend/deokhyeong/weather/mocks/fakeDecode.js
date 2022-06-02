const decode = (token) => {
  if (!token) return ''
  const arr = token.split('_')
  const expire = arr[1]
  return expire
}

export default decode
