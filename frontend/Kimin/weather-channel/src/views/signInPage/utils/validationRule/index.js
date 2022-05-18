/* eslint-disable */ 
/* 긴 로직의 가독성을 올리기 위해 함수를 쪼갰고, hoisting을 활용해서 읽는 순서를 조정해주는게 의미가 있다고 생각하여 hoisting방지 Rule을 껐습니다.
다른 코드에서도 function hoisting을 활용할 예정은 없는것같고, 이 페이지에서만 예외적으로 적용하겠습니다.*/
const IDValidationRule = [
  (value) => skipNeverRule(value, 'ID'),
  (value) => minLengthRule(value, 'ID', 6),
  (value) => maxLengthRule(value, 'ID', 10),
  (value) => blankNeverRule(value, 'ID'),
  (value) => KoreanNeverRule(value, 'ID'),
  (value) => englishEssentialRule(value, 'ID'),
  (value) => specialCharacterNeverRule(value, 'ID'),
]

const nameValidationRule = [
  (value) => skipNeverRule(value, 'name'),
  (value) => minLengthRule(value, 'name', 2),
  (value) => maxLengthRule(value, 'name', 7),
  (value) => blankNeverStartOrFinishRule(value, 'name'),
  (value) => singleKoreanNeverRule(value, 'name'),
  (value) => englishOrKoreanEssentialRule(value, 'name'),
]

const passwordValidationRule = [
  (value) => skipNeverRule(value, 'password'),
  (value) => minLengthRule(value, 'password', 8),
  (value) => maxLengthRule(value, 'password', 12),
  (value) => numberEssentialRule(value, 'password'),
  (value) => blankNeverRule(value, 'password'),
  (value) => KoreanNeverRule(value, 'password'),
  (value) => englishEssentialRule(value, 'password'),
  (value) => specialCharacterEssentialRule(value, 'ID'),
]

export { IDValidationRule, passwordValidationRule, nameValidationRule }


function skipNeverRule(value, kind) {
  return !!value || `${kind} is required`
}

function minLengthRule(value, kind, min) {
  return (value.length >= min) || `${kind} must equal or bigger than ${min}`
}

function maxLengthRule(value, kind, max) {
  return (value.length <= max) || `${kind} must equal or smaller than ${max}`
}

function blankNeverStartOrFinishRule(value, kind) {
  return !(/(^\s+|\s+$)/g.test(value)) || `${kind} never have blank at start or finish `
}

function blankNeverRule(value, kind) {
  return !(/ /g.test(value)) || `${kind} never have blank`
}

function KoreanEssentialRule(value, kind) {
  return (/[ㄱ-ㅎ|가-힣|ㅏ-ㅣ]/g.test(value)) || `${kind} must have Korean`
}

function KoreanNeverRule(value, kind) {
  return !(/[ㄱ-ㅎ|가-힣|ㅏ-ㅣ]/g.test(value)) || `${kind} never have Korean`
}

function singleKoreanNeverRule(value, kind) {
  return !(/[ㄱ-ㅎ|ㅏ-ㅣ]/.test(value)) || `${kind} never have Korean single vowel or consonant`
}

function englishOrKoreanEssentialRule(value, kind) {
  return /[a-zA-Z가-힣]/g.test(value) || `${kind} must have English or Korean`
}

function englishEssentialRule(value, kind) {
  return /[a-zA-Z]/g.test(value) || `${kind} must have English alphabet`
}

function englishNeverRule(value, kind) {
  return !/[a-zA-Z]/g.test(value) || `${kind} never have English alphabet`
}

function specialCharacterNeverRule(value, kind) {
  return !/[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&=('"]/g.test(value) || `${kind} never have special character`
}

function specialCharacterEssentialRule(value, kind) {
  return /[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&=('"]/g.test(value) || `${kind} must have special character`
}

function numberNeverRule(value, kind) {
  return !(/[\d]/g.test(value)) || `${kind} never have number`
}

function numberEssentialRule(value, kind) {
  return /\d/.test(value) || `${kind} must have number`
}
