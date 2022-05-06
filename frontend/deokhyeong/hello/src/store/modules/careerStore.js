import { catchError } from '@/utils/error'
import initDatas from '../storeInitDatas'

const careerStore = {
  namespaced: true,
  state: {
    careers: [
      {
        id: Math.random(),
        careerDetail: [{
          key: 'companyName',
          label: '회사명',
          value: '바로고',
          placeholder: 'placeholder 테스트',
          isEdit: false,
          rules: [],
          checkValidation: () => true,
        },
        {
          key: 'period',
          label: '근무 기간',
          value: '2022.04.11 ~ 재직중',
          placeholder: '',
          isEdit: false,
          rules: [],
          checkValidation: () => true,
        },
        {
          key: 'project',
          label: '근무 내용',
          value: '프론트엔드 개발자가 되기위해 인턴십 프로잭트를 열심히 진행중',
          placeholder: 'placeholder 테스트',
          isEdit: false,
          inputType: 'multiline',
          rules: [],
          checkValidation: () => true,
        }],
      },
    ],
  },
  getters: {
    careers: (state) => state.careers,
    careersCount: (state) => state.careers.length,
    recentCareerInfos: (state) => state.careers[0].careerDetail,
    companyName: (state, { recentCareerInfos }) => recentCareerInfos.find((info) => info.key === 'companyName')?.value,
    period: (state, { recentCareerInfos }) => recentCareerInfos.find((info) => info.key === 'period')?.value,
    project: (state, { recentCareerInfos }) => recentCareerInfos.find((info) => info.key === 'project')?.value,
  },
  mutations: {
    updateCareerInfo(state, { value, inputData }) {
      const targetCareerIndex = state.careers.findIndex(
        (career) => career.id === inputData.careerId,
      )

      const { careerDetail } = state.careers[targetCareerIndex]
      const targetInputIndex = careerDetail.findIndex(
        (detail) => detail.key === inputData.key,
      )

      careerDetail.splice(
        targetInputIndex,
        1,
        {
          ...careerDetail[targetInputIndex],
          value,
          isEdit: false,
        },
      )
    },
    editCareerInfo(state, { inputData }) {
      const targetCareerIndex = state.careers.findIndex(
        (career) => career.id === inputData.careerId,
      )

      const { careerDetail } = state.careers[targetCareerIndex]
      const targetInputIndex = careerDetail.findIndex(
        (detail) => detail.key === inputData.key,
      )

      careerDetail.splice(
        targetInputIndex,
        1,
        {
          ...careerDetail[targetInputIndex],
          isEdit: true,
        },
      )
    },
    addCareerInfo(state) {
      const initCareerData = {
        id: Math.random(),
        careerDetail: [...initDatas.initCareerDetail],
      }

      state.careers.push(initCareerData)
    },
    deleteCareerInfo(state, { careerId }) {
      const targetCareerIndex = state.careers.findIndex(
        (career) => career.id === careerId,
      )
      state.careers.splice(
        targetCareerIndex,
        1,
      )
    },
    checkCareerCount(state, { warningModal, careersCount }) {
      if (careersCount === 1) {
        warningModal({
          alertText: '커리어 관리는 최소 정보가 1개 이상이어야 합니다.',
          alertType: 'warning',
        })
        throw new Error('exit')
      }
    },
  },
  actions: {
    updateCareer({ commit }, { value, inputData }) {
      commit('updateCareerInfo', { value, inputData })
    },
    editCareer({ commit }, { inputData }) {
      commit('editCareerInfo', { inputData })
    },
    addCareer({ commit }) {
      commit('addCareerInfo')
    },
    deleteCareer({ commit, getters }, { careerId, warningModal }) {
      catchError(
        () => commit('checkCareerCount', { warningModal, careersCount: getters.careersCount }),
        () => commit('deleteCareerInfo', { careerId }),
      )
    },
  },
}

export default careerStore
