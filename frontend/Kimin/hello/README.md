# 자기소개 및 회사소개 만들기

------

[TOC]

## 1. 프로젝트 개요
- 자기소개와 회사소개를 포함
- 프로젝트 목표 : vueRouter 및 컴포넌트 활용

## 2. 폴더 구조

```
├── README.md
├── babel.config.js
├── jsconfig.json
├── options.js
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.vue
│   ├── assets
│   ├── components
│   │   ├── Carousel.vue
│   │   └── layout
│   │       ├── AppHeader.vue
│   │       ├── AppMenu.vue
│   │       └── PersonalMenu.vue
│   ├── main.js
│   ├── plugins
│   │   └── vuetify.js
│   ├── router
│   │   ├── hello
│   │   │   ├── contents
│   │   │   │   └── index.js
│   │   │   ├── header
│   │   │   │   └── index.js
│   │   │   └── index.js
│   │   └── index.js
│   ├── store
│   │   └── index.js
│   └── views
│       ├── CEO.vue
│       ├── Company.vue
│       ├── Family.vue
│       ├── History.vue
│       ├── Home.vue
│       ├── Kimin.vue
│       ├── Market.vue
│       └── Taste.vue
└── vue.config.js
```
## 3. 주요 내용
### 		3-1. header구조와 라우터뷰 구성			

  - FirstHeader > secondHeader > mainView로 이어지는 중첩 라우팅을 통해 페이지 구성
  - FirstHeader는 회사소개와 자기소개중 하나를 선택할 수 있는 2개의 메뉴로 구성(각각 router-link)
  - First-line선택에 따라 라우터뷰로 SecondHeader가 나타나며, 이는 중분류 메뉴로 구성(각각 router-link)
  - FirstHeader와 SecondHeader의 중첩 라우팅 조합에 의해 mainview로서 메뉴별 화면  render


```

├── first-header
│   ├── defaultView("/")
│   ├── SecondHeader(PersonalMenu)
│   │   ├── defaultView("/Kimin")
│   │   ├── TasteView("/Kimin/Tastes")
│   │   └── FamilyView("/Kimin/Family")
│   └── SecondHeader(CompannyMenu)
│   │   ├── defaultView("/Barogo")
│   │   ├── TasteView("/Barogo/History")
│   │   ├── TasteView("/Barogo/Market")
│   │   └── CEOView("/Barogo/CEO")
```

---

<h3>3-1. header구조와 라우터뷰 구성</h3>

- 자기소개 하위메뉴의 TasteView와 Familyview에는 공통으로 carousel component가 활용됨
- carousel 컴포넌트는 상위 컴포넌트로부터 사진앨범객체의 배열을 props로 상속받으며, 아래의 기능을 갖춤
  	1. 슬라이드 쇼 및 선택이미지를 메인 이미지로서 설명(확대 이미지, 제목, 설명)
  	2. 자동 슬라이드쇼(3초마다 한칸씩 이동)
  	3. 임의 선택에 의해 메인이미지 선택 가능(이 경우 자동슬라이드 stop)
  	4. Next 버튼, prev 버튼에 의해 슬라이드 이동조작



## 4. script 구성

<h3>Project setup</h3>

```
npm install
npm run serve
```


<h3>Project setup</h3>
```
npm install
```

<h3>Compiles and hot-reloads for development</h3>
```
npm run serve
```

<h3>Compiles and minifies for production</h3>
```
npm run build
```

<h3>Lints and fixes files</h3>
```
npm run lint
```

<h3>Customize configuration</h3>
See [Configuration Reference](https://cli.vuejs.org/config/).
