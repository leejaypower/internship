import dayjs from 'dayjs'

const conventionMapping = (errorLog) => {
  const token = localStorage.getItem('accessToken')
  const UNKNOWN = 'unknown'

  const result = {
    type: UNKNOWN,
    userId: token ? token.split('_')[0] : 'unknownUser',
    createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    name: UNKNOWN,
    originMessage: UNKNOWN,
    message: UNKNOWN,
    stack: UNKNOWN,
    originElement: UNKNOWN,
    uri: UNKNOWN,
    isOnlyLogginUserPage: UNKNOWN,
    lifecycle: UNKNOWN,
    lineNo: UNKNOWN,
    columnNo: UNKNOWN,
    apiErrorStack: UNKNOWN,
    responseURL: UNKNOWN,
    status: UNKNOWN,
  }

  if (!errorLog) {
    return { ...result }
  }
  return {
    ...result,
    ...errorLog,
  }
}

export default conventionMapping
