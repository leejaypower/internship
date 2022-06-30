import fakeHttp from '@/lib/fakeHttp'

const commitErrorLog = (errorLog) => fakeHttp.post('/errorLog', errorLog)

export default {
  commitErrorLog,
}
