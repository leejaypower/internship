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
  /**
   * 확인 취소를 할 수 있는 알림
   * @param {string} title 제목
   * @param {string} text 내용
   * @param {string} okText 확인 내용
   * @param {string} cancelText 취소 내용
   * @param {string}[okColor=#6558F5] okColor 확인 색상
   * @returns
   */
  confirm(title, text, okText, cancelText, okColor = '#6558F5') {
    return swal.fire({
      icon: 'info',
      title,
      html: text,
      showCancelButton: true,
      confirmButtonText: okText,
      confirmButtonColor: okColor,
      cancelButtonText: cancelText,
    })
  },
  input(title, text, okText, cancelText, okColor = '#6558F5') {
    return swal.fire({
      title,
      input: 'text',
      inputLabel: text,
      confirmButtonText: okText,
      confirmButtonColor: okColor,
      showCancelButton: true,
      cancelButtonText: cancelText,
      inputValidator: (value) => {
        if (!value) {
          return '내용을 입력해 주세요.'
        }
        return false
      },
    })
  },
}

export default alert
