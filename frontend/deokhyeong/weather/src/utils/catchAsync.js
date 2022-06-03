// 파일 자체의 삭제는 feature/issue-321에서 진행하겠습니다.
// 우선 해당 PR인 issue-271에서는 catchAsync를 걷어냈습니다.

const catchAsync = async (callback) => {
  try {
    const response = await callback()
    return response
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('개발자님, 에러를 확인해주세요 => ', error)
    }
    return error
  }
}

export default catchAsync
