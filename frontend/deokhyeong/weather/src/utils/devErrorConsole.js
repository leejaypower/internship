const devErrorConsole = (error) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('개발자님, 에러를 확인해주세요 => ', error)
  }
}

export default devErrorConsole
