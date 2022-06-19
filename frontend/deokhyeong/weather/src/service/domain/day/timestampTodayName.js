import dayjs from 'dayjs'

/**
 * 인자는
 * @param {number} timestamp
 * @returns '일요일' | '월요일' | '화요일' | '수요일' | '목요일' | '금요일' | '토요일' | '정보 없음'
 */
const timestampToDayName = (timestamp) => {
  if (!timestamp) {
    return '정보 없음'
  }

  const dayIndex = dayjs(timestamp).get('day')
  const dayNameMap = {
    0: '일요일',
    1: '월요일',
    2: '화요일',
    3: '수요일',
    4: '목요일',
    5: '금요일',
    6: '토요일',
  }

  return dayNameMap[dayIndex]
}

export default timestampToDayName
