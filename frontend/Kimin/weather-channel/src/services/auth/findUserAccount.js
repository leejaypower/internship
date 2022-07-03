import store from '@/store'
import fakeAxios from '../fakeAxios'

const findUserAccount = async (accountInformation) => {
  try {
    const response = await fakeAxios.get('findAccount', accountInformation)
    const foundedID = response.body.result
    if (!foundedID) {
      throw new Error('no results')
    }
    store.dispatch('snackBarStore/alertMessage', { text: `당신의 ID는 ${foundedID}입니다.`, color: 'green' })
  } catch (error) {
    if (error.message === 'no results') {
      store.dispatch('snackBarStore/alertMessage', { text: '요청하신 정보와 일치하는 계정이 없습니다.', color: 'pink' })
    } else {
      store.dispatch('snackBarStore/alertMessage', { text: '서버에 알수없는 에러가 발생했습니다.', color: 'pink' })
    }
  }
}

export default findUserAccount
