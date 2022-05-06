import { checkEmailValidation, emailVaildationRule } from '@/utils/validation'

const initBasicUserInfos = [
  {
    id: 1,
    key: 'userName',
    label: '이름',
    value: '',
    placeholder: '',
    isEdit: false,
    rules: [],
    checkValidation: () => true,
  },
  {
    id: 2,
    key: 'email',
    label: '이메일',
    value: '',
    placeholder: '',
    isEdit: false,
    rules: [emailVaildationRule],
    checkValidation: checkEmailValidation,
  },
  {
    id: 3,
    key: 'hobby',
    label: '취미',
    value: '',
    placeholder: '',
    isEdit: false,
    rules: [],
    checkValidation: () => true,
  },
  {
    id: 4,
    key: 'living',
    label: '사는 곳',
    value: '',
    placeholder: '',
    isEdit: false,
    rules: [],
    checkValidation: () => true,
  },
]

const initCareerDetail = [
  {
    key: 'companyName',
    label: '회사명',
    value: '',
    placeholder: '',
    isEdit: false,
    rules: [],
    checkValidation: () => true,
  },
  {
    key: 'period',
    label: '근무 기간',
    value: '',
    placeholder: '',
    isEdit: false,
    rules: [],
    checkValidation: () => true,
  },
  {
    key: 'project',
    label: '근무 내용',
    value: '',
    placeholder: '',
    isEdit: false,
    inputType: 'multiline',
    rules: [],
    checkValidation: () => true,
  },
]

export default {
  initBasicUserInfos,
  initCareerDetail,
}
