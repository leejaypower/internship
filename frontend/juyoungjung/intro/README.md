# Introduction

Vue.js와 Vuetify, Vue Router를 이용해 저와 바로고라는 회사를 소개하는 페이지를터
미널이라는 스타일 컨셉으로 만들어본 프로젝트입니다.

# Project Design

- 자기소개 페이지와 회사소개 페이지 두 주제로 나누어 2개의 페이지를 만들고
  vue-router를 통해 두 페이지를 이동한다.
- 회사소개 페이지는 자기소개페이지와 같은 레이아웃으로 하며, 색은 light 버전으로
  만든다.
- 자기소개 페이지는 총 4개의 section으로 나누어 intro(section _ 1),
  about(section _ 3), contact(section \* 1)라는 3가지 주제로 각 section의
  content를 구성한다.
- 회사소개 페이지는 총 2개의 section으로 나누어 intro(section _ 1),
  about(section _ 2) 총 2가지 주제로 각 section의 content를 구성한다.

[[2주차] 자기+회사소개 페이지 기획 - 정주영](https://www.notion.so/barogohq/b9137da43dbd449c9707c23ccd60fa1d)

# Features

- 모든 페이지에 한/영 버전을 선택할 수 있는 switch button를 만든다.
- SideBar에 vue-router를 적용하여 자기소개페이지와 회사소개페이지 링크를 연결한
  다.
- SideBar 페이지 링크 클릭 시 각 페이지의 section을 구분해주는 하위 메뉴이 나타
  난다.
- 현재 보이는 section에 해당하는 하위 메뉴 앞에 점표시가 보여 활성화 상태는 나타
  낸다.
- 각 하위 메뉴 클릭 시 해당 section으로 scroll 이동한다.
- LandingPage에서 text typing animation 효과를 준다. 터미널과 같은 배경에 문구가
  순서대로 타이핑되고 지워진다.
- LandingPage에서 아래로 스크롤 시 scroll to top button 보이기 시작한다. 클릭시
  첫번째 section으로 올라간다.

# Using Libraray

```
  "@mdi/font": "^6.6.96",
  "core-js": "^3.8.3",
  "vue": "^2.6.14",
  "vue-router": "^3.5.3",
  "vue-typer": "^1.2.0",
  "vuetify": "^2.6.0"
```

# Folder Structure

```
.
├── README.md
├── babel.config.js
|     └── chunk-vendors.87b1b44a.js.map
├── jsconfig.json
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.vue
│   ├── assets
│   │   ├── fonts
│   │   │   ├── Montserrat-Medium.ttf
│   │   │   ├── Montserrat-MediumItalic.ttf
│   │   │   ├── Montserrat-Regular.ttf
│   │   │   ├── NotoSans-Regular.eot
│   │   │   ├── NotoSansKR-Regular.otf
│   │   │   ├── NotoSansKR-Regular.woff
│   │   │   └── NotoSansKR-Regular.woff2
│   │   ├── images
│   │   │   ├── barogo_logo.png
│   │   │   ├── calculation_formula.png
│   │   │   ├── mission_1.png
│   │   │   ├── mission_2.png
│   │   │   ├── mission_3.png
│   │   │   ├── profile_me.png
│   │   │   └── tech_tree.png
│   │   └── styles
│   │       ├── constants.scss
│   │       ├── global.scss
│   │       └── self_intro.scss
│   ├── components
│   │   ├── BarogoIntro
│   │   │   ├── About
│   │   │   ├── Index.vue
│   │   │   └── LandingPage.vue
│   │   ├── ScrollToTopBtn.vue
│   │   ├── SelfIntro
│   │   │   ├── About
│   │   │   ├── ContactMe.vue
│   │   │   ├── Index.vue
│   │   │   └── LandingPage.vue
│   │   └── SideBar.vue
│   ├── main.js
│   ├── plugins
│   │   └── vuetify.js
│   └── router.js
└── vue.config.js

```

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```
