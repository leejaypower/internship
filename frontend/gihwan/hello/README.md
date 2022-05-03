# 자기소개 및 회사소개 만들기

[1. 프로젝트 설명](#1-프로젝트-설명)<br/>
[2. 필수 조건](#2-필수-조건)<br/>
[3. 폴더 구조](#3-폴더-구조)<br/>
[4. 주요 내용](#4-주요-내용)<br/>
  - [4-1 vue-router](#vue-router)
  - [4-2 component](#component)
  - [4-3 position-fixed](#position-fixed)
  - [4-4 scrollup 버튼](#scrollup-버튼)
  - [4-5 반응형 디자인](#반응형-디자인)

[5. 프로젝트 실행](#5-프로젝트-실행)<br/>

## 1. 프로젝트 설명
**현재 vue와 친해지기 위한 실습 단계여서 소개 내용과 디자인보다는 컴포넌트의 활용과 기능 부분에 더 신경을 썼습니다.**

## 2. 필수 조건
- [x] 컴포넌트 2개 이상 사용
- [x] vue-ruter 사용

## 3. 폴더 구조
```
src
├── App.vue
├── components
│   ├── ScrollUp.vue
│   ├── TheNav.vue
│   └── TheSection.vue
├── data
│   └── index.js
├── main.js
├── router
│   └── index.js
├── style
│   ├── common.css
│   └── reset.css
└── views
    ├── CompanyIntro.vue
    ├── IntroView.vue
    ├── MeIntro.vue
    └── NotFound.vue
```
## 4. 주요 내용
### vue-router
자기소개와 회사소개를 구분하기 위해 라우터를 사용<br/>
소개라는 큰 타이틀이 겹쳐 중첩 라우터를 사용하여 구분
```
/intro
  /me
  /company
```

---

### component
컴포넌트의 재사용성과 유지보수를 생각하여 section부분을 나누어 설계하였고, props를 통해 component를 핸들링 할 수 있도록 구현

|props|내용|
|--|--|
|title|제목에 들어갈 내용|
|titleColor|제목의 색상|
|desc|설명에 들어갈 내용|
|descColor|설명의 색상|
|type|제목과 설명을 세로로 나열할지, 가로로 나열할지에 대한 선택 |
|bgColoe|배경화면의 색상|

---

### position: fixed
navigation을 컴포넌트로 따로 분리하고, fixed로 상단에 고정하여 자기소개와 회사소개 페이지를 바로 이동할 수 있도록 구현.<br/>
또한 이동한 페이지의 버튼 색상을 달리하여 사용자가 현재 페이지에 대한 확인이 가능하도록 구현

---

### scrollUp 버튼
루트 컴포넌트가 마운트 시 scoll 이벤트를 걸어 스크롤이 어느 정도 내려가면 제일 최상위로 올라갈 수 있는 버튼이 나오도록 구현.<br/>

언마운트되기 전에 scroll이벤트 삭제
```js
// App.vue
// ...
mounted() {
  window.addEventListener('scroll', this.scrollHandler)
},
beforeUnmount() {
  window.removeEventListener('scroll', this.scrollHandler)
},
```

---

### 반응형 디자인
@media를 이용하여 반응형 디자인 구현
```css
/* css of TheSection.vue */
@media screen and (max-width: 400px){
     h2 {
       font-size: 30px
     }
     span {
       font-size: 16px;
       max-width: 200px;
     }
  }
```

또한 페이지 전환 시 scroll이 최상위로 올라가도록 router에 설정
```js
// router/index.js
// ...
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes,
})
```

## 5. 프로젝트 실행
```
npm install
npm run serve
```
