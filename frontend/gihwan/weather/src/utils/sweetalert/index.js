import swal from 'sweetalert2'

/**
 * 알림의 옵션을 넣는 함수
 * @param {string} title 제목
 * @param {string} text 내용
 * @param {string} [position=top] 위치
 * @returns {object} 옵션들
 */
const options = (title, text, position = 'top') => ({
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
   * @param {string} [position=top] 위치
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
   * @param {string} [position=top] 위치
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
   * @param {string} [position=top] 위치
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
   * @param {string} [position=top] 위치
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
   * @param {string} [position=top] 위치
   */
  question(title, text, position) {
    swal.fire({
      icon: 'question',
      ...options(title, text, position),
    })
  },
}

export default alert

// const defaultOptions = {
//   toast: true,
//   showConfirmButton: false,
//   timer: 3500,
// }

// export const failLoginAlert = (failMessage) => ({
//   ...defaultOptions,
//   position: 'top',
//   icon: 'error',
//   title: '로그인 실패',
//   text: failMessage,
// })

// export const reFailLoginAlert = () => ({
//   ...defaultOptions,
//   position: 'top',
//   icon: 'warning',
//   title: '로그인 실패',
//   html: `
//     <span style="font-size: 15px;">이미 시도한 아이디와 비밀번호입니다.</span>
//     <br/>
//     <span style="font-size: 14px;">다른 아이디와 비밀번호를 입력해 주세요.</span>
//   `,
// })

// export const successLoginAlert = (name, isMobile) => ({
//   ...defaultOptions,
//   timerProgressBar: true,
//   position: isMobile ? 'top' : 'top-end',
//   icon: 'success',
//   title: '로그인 성공',
//   text: `${name}님 환영합니다.`,
// })

// export const duplicateCheckAlert = () => ({
//   ...defaultOptions,
//   position: 'top',
//   icon: 'error',
//   title: '중복 체크',
//   text: '아이디 중복 체크를 해주세요.',
// })

// export const successSignupFetch = (isMobile) => ({
//   ...defaultOptions,
//   timerProgressBar: true,
//   position: isMobile ? 'top' : 'top-end',
//   icon: 'success',
//   title: '회원가입 성공',
//   text: '로그인을 시도해 보세요.',
// })
