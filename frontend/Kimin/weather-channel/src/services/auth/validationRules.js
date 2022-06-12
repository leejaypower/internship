/* eslint-disable */ 
import {
  ID_MAX_LENGTH,
  ID_MIN_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
} from '@/constants'


const IDValidationRule = [
  (value) => skipNeverRule(value, 'ID'),
  (value) => minLengthRule(value, 'ID', ID_MIN_LENGTH),
  (value) => maxLengthRule(value, 'ID', ID_MAX_LENGTH),
  (value) => blankNeverRule(value, 'ID'),
  (value) => KoreanNeverRule(value, 'ID'),
  (value) => englishEssentialRule(value, 'ID'),
  (value) => specialCharacterNeverRule(value, 'ID'),
]

const nameValidationRule = [
  (value) => skipNeverRule(value, 'name'),
  (value) => minLengthRule(value, 'name', NAME_MIN_LENGTH),
  (value) => maxLengthRule(value, 'name', NAME_MAX_LENGTH),
  (value) => blankNeverStartOrFinishRule(value, 'name'),
  (value) => singleKoreanNeverRule(value, 'name'),
  (value) => englishOrKoreanEssentialRule(value, 'name'),
]

const passwordValidationRule = [
  (value) => skipNeverRule(value, 'password'),
  (value) => minLengthRule(value, 'password', PASSWORD_MIN_LENGTH),
  (value) => maxLengthRule(value, 'password', PASSWORD_MAX_LENGTH),
  (value) => numberEssentialRule(value, 'password'),
  (value) => blankNeverRule(value, 'password'),
  (value) => KoreanNeverRule(value, 'password'),
  (value) => englishEssentialRule(value, 'password'),
  (value) => specialCharacterEssentialRule(value, 'ID'),
]

export { IDValidationRule, passwordValidationRule, nameValidationRule }


function skipNeverRule(value, kind) {
  return !!value || `${kind} 은/는 필수항목입니다.`
}

function minLengthRule(value, kind, min) {
  return (value.length >= min) || `${kind} 의 최소 요구 길이는 ${min}`
}

function maxLengthRule(value, kind, max) {
  return (value.length <= max) || `${kind} 의 최대 허용 길이는 ${max}`
}

function blankNeverStartOrFinishRule(value, kind) {
  return !(/(^\s+|\s+$)/g.test(value)) || `${kind} 맨 앞 또는 맨 뒤에는 공백을 넣어서는 안됩니다.`
}

function blankNeverRule(value, kind) {
  return !(/ /g.test(value)) || `${kind} 에는 공백을 포함시킬 수 없습니다.`
}

function KoreanEssentialRule(value, kind) {
  return (/[ㄱ-ㅎ|가-힣|ㅏ-ㅣ]/g.test(value)) || `${kind} 은/는 반드시 한글을 포함하여야 합니다.`
}

function KoreanNeverRule(value, kind) {
  return !(/[ㄱ-ㅎ|가-힣|ㅏ-ㅣ]/g.test(value)) || `${kind} 에는 한글이 포함되어서는 안됩니다.`
}

function singleKoreanNeverRule(value, kind) {
  return !(/[ㄱ-ㅎ|ㅏ-ㅣ]/.test(value)) || `${kind} 은/는 단독 자/모음으로는 구성될 수 없습니다.`
}

function englishOrKoreanEssentialRule(value, kind) {
  return /[a-zA-Z가-힣]/g.test(value) || `${kind} 은/는 반드시 영문또는 한글이 포함되어야 합니다.`
}

function englishEssentialRule(value, kind) {
  return /[a-zA-Z]/g.test(value) || `${kind} 은/는 반드시 영문을 포함하여야 합니다.`
}

function englishNeverRule(value, kind) {
  return !/[a-zA-Z]/g.test(value) || `${kind} 에는 영문이 포함되어서는 안됩니다.`
}

function specialCharacterNeverRule(value, kind) {
  return !/[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&=('"]/g.test(value) || `${kind} 에는 특수문자가 포함될 수 없습니다.`
}

function specialCharacterEssentialRule(value, kind) {
  return /[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&=('"]/g.test(value) || `${kind} 에는 반드시 특수문자가 포함되어야만 합니다.`
}

function numberNeverRule(value, kind) {
  return !(/[\d]/g.test(value)) || `${kind} 에는 숫자를 포함시킬 수 없습니다.`
}

function numberEssentialRule(value, kind) {
  return /\d/.test(value) || `${kind} 에는 반드시 하나이상의 숫자가 포함되어야 합니다.`
}
