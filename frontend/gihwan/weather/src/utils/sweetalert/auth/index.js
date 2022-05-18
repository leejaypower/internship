const defaultOptions = {
  toast: true,
  showConfirmButton: false,
  timer: 3500,
}

export const failLoginAlert = (failMessage) => ({
  ...defaultOptions,
  position: 'top',
  icon: 'error',
  title: '로그인 실패',
  text: failMessage,
})

export const reFailLoginAlert = () => ({
  ...defaultOptions,
  position: 'top',
  icon: 'warning',
  title: '로그인 실패',
  html: `
    <span style="font-size: 15px;">이미 시도한 아이디와 비밀번호입니다.</span>
    <br/>
    <span style="font-size: 14px;">다른 아이디와 비밀번호를 입력해 주세요.</span>
  `,
})

export const successLoginAlert = (name, isMobile) => ({
  ...defaultOptions,
  timerProgressBar: true,
  position: isMobile ? 'top' : 'top-end',
  icon: 'success',
  title: '로그인 성공',
  text: `${name}님 환영합니다.`,
})
