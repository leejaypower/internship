const checkDuplicatedInfo = (target, savedInfoKey) => {
  if (target !== localStorage.getItem(savedInfoKey)) {
    return false
  }
  return true
}

export default checkDuplicatedInfo
