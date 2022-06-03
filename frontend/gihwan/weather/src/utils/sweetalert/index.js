import swal from 'sweetalert2'

/**
 * 알림의 옵션을 넣는 함수
 * @param {string} title 제목
 * @param {string} text 내용
 * @param {string} [position=top-end] 위치
 * @returns {object} 옵션들
 */
const options = (title, text, position = 'top-end') => ({
  toast: true,
  showConfirmButton: false,
  timer: 3500,
  position,
  title,
  html: text,
})

const alert = {
  /**
   * 경고 알림
   * @param {string} title 제목
   * @param {string} text 내용
   * @param {string} [position=top-end] 위치
   */
  warning(title, text, position) {
    swal.fire({
      icon: 'warning',
      ...options(title, text, position),
    })
  },
  /**
   * 에러 알림
   * @param {string} title 제목
   * @param {string} text 내용
   * @param {string} [position=top-end] 위치
   */
  error(title, text, position) {
    swal.fire({
      icon: 'error',
      ...options(title, text, position),
    })
  },
  /**
   * 성공 알림
   * @param {string} title 제목
   * @param {string} text 내용
   * @param {string} [position=top-end] 위치
   */
  success(title, text, position) {
    swal.fire({
      icon: 'success',
      ...options(title, text, position),
    })
  },
  /**
   * 정보 알림
   * @param {string} title 제목
   * @param {string} text 내용
   * @param {string} [position=top-end] 위치
   */
  info(title, text, position) {
    swal.fire({
      icon: 'info',
      ...options(title, text, position),
    })
  },
  /**
   * 질문 알림
   * @param {string} title 제목
   * @param {string} text 내용
   * @param {string} [position=top-end] 위치
   */
  question(title, text, position) {
    swal.fire({
      icon: 'question',
      ...options(title, text, position),
    })
  },
  confirm(title, text) {
    return swal.fire({
      icon: 'question',
      title,
      text,
      showCancelButton: true,
      confirmButtonText: '삭제',
      confirmButtonColor: 'red',
      cancelButtonText: '취소',
    })
  },
}

export default alert
