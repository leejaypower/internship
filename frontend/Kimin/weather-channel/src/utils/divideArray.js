export default function divideArray(OrininalArray, size) {
  const containerArray = []
  for (let i = 0; i < OrininalArray.length; i += size) {
    const unitArray = OrininalArray.slice(i, i + size)
    containerArray.push(unitArray)
  }
  return containerArray
}
