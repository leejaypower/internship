import { checkEmailValidation, emailVaildationRule } from '@/utils/validation'

const userStore = {
  namespaced: true,
  state: {
    basicUserInfos: [
      {
        id: 1,
        key: 'userName',
        label: '이름',
        value: '허덕형',
        placeholder: '',
        isEdit: false,
        rules: [],
        checkValidation: () => true,
      },
      {
        id: 2,
        key: 'email',
        label: '이메일',
        value: 'heodh@barogo.com',
        placeholder: '',
        isEdit: false,
        rules: [emailVaildationRule],
        checkValidation: checkEmailValidation,
      },
      {
        id: 3,
        key: 'hobby',
        label: '취미',
        value: '야구',
        placeholder: '',
        isEdit: false,
        rules: [],
        checkValidation: () => true,
      },
      {
        id: 4,
        key: 'living',
        label: '사는 곳',
        value: '서울시 강서구 방화동',
        placeholder: '',
        isEdit: false,
        rules: [],
        checkValidation: () => true,
      },
    ],
  },
  getters: {
    basicUserInfos: (state) => state.basicUserInfos,
    userName: ({ basicUserInfos }) => basicUserInfos.find((info) => info.key === 'userName').value,
    email: ({ basicUserInfos }) => basicUserInfos.find((info) => info.key === 'email').value,
    hobby: ({ basicUserInfos }) => basicUserInfos.find((info) => info.key === 'hobby').value,
    living: ({ basicUserInfos }) => basicUserInfos.find((info) => info.key === 'living').value,
  },
  mutations: {
    updateBasicInfo(state, { value, inputData }) {
      const targetIndex = state.basicUserInfos.findIndex(
        (userInfo) => userInfo.key === inputData.key,
      )

      state.basicUserInfos.splice(targetIndex, 1, {
        ...state.basicUserInfos[targetIndex],
        value,
        isEdit: false,
      })
    },
    editBasicInfo(state, { inputData }) {
      const targetIndex = state.basicUserInfos.findIndex(
        (userInfo) => userInfo.key === inputData.key,
      )

      state.basicUserInfos.splice(
        targetIndex,
        1,
        {
          ...state.basicUserInfos[targetIndex],
          isEdit: true,
        },
      )
    },
  },
  actions: {
    updateUserInfo({ commit }, { value, inputData }) {
      commit('updateBasicInfo', { value, inputData })
    },
    editUserInfo({ commit }, { inputData }) {
      commit('editBasicInfo', { inputData })
    },
  },
}

export default userStore
