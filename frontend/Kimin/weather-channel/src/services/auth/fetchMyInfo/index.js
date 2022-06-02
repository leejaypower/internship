import store from '@/store'
import logInAxios from '@/services/fakeAxios'
import requestNewTokens from '../requestNewTokens'

const fetchMyInfo = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken')
    await logInAxios.get.verifyToken(accessToken)
    const { ID } = JSON.parse(localStorage.getItem('myInfo'))
    const myInfo = await logInAxios.get.getMyInfo(ID)
    store.dispatch('forwardingMyInfo', myInfo)
  } catch {
    await requestNewTokens()
    fetchMyInfo()
  }
}
/* todo :
auth 재시도에 관한 recover로직(requestNewToken)에 헛점
 - 에러케이스별 대응없음(서버이상, 토큰소실, 토큰만료)
 - 통신 State별 대응도 고려필요 code == 200 or not
catch이후 재귀함수 호출또한 무한루프 위험
 - requestNewTokens()가 성공할 시에만 작동하는 것이현상태

이상의 TODO 리팩토링은 별도 이슈 및 pr진행하여 해결할 것
// 액션부로 옮기는건 이번 pr
*/

export default fetchMyInfo
