const errorMessageMap = (error) => {
  const errorMessage = error.message
  let text
  const color = 'pink'
  if (errorMessage === 'Invalid Query') {
    text = '잘못된 검색어입니다.'
  } else {
    text = '알수없는 오류입니다.'
  }

  return { text, color }
}

export default errorMessageMap
