const dropdownMenuItems = {
  before_login: [
    {
      title: '회원가입',
      name: 'signup',
      to: '/signup',
    },
    {
      title: '로그인',
      name: 'login',
      to: '/',
    },
  ],
  after_login: [
    {
      title: '내 정보 수정하기',
      name: 'updateMyInfo',
      to: '/update-my-info',
    },
    {
      title: '로그아웃',
      name: 'logout',
      to: '/',
    },
  ],
}

export default dropdownMenuItems
