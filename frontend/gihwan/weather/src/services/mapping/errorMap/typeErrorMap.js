const typeErrorMap = (errorMessage, valueName = '입력한 또는 보내는 값') => {
  switch (errorMessage) {
    case 'string':
      return { title: '타입 오류', desc: `${valueName}은(는) 문자열이어야 합니다.` }
    case 'number':
      return { title: '타입 오류', desc: `${valueName}은(는) 숫자이어야 합니다.` }
    case 'object':
      return { title: '타입 오류', desc: `${valueName}은(는) 객체이어야 합니다.` }
    default:
      return { title: '타입 오류', desc: '올바른 타입이 아닙니다.' }
  }
}

export default typeErrorMap
