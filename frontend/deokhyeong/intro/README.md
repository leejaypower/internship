# Intro Project

바로고 인턴십의 1주차 과제</br>
뷰의 컴포넌트와 작동 방식에 익숙해지기 위해 진행하는 첫 프로젝트

---
## 폴더 구조
```
intro
├── node_modules
│
├── README.md
├── babel.config.js
├── jsconfig.json
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.vue
│   ├── components
│   │   ├── TitleHeader.vue
│   │   └── TodoList
│   │       ├── TodoListInput.vue
│   │       ├── TodoListItem.vue
│   │       └── TodoListItems.vue
│   ├── main.js
│   └── plugins
│       └── vuetify.js
└── vue.config.js
```
현재 셋업 구조만 작성하였습니다.

--- 
## 프로젝트 스크립트 명령어

### Project 패키지 개발 환경으로 실행
```
npm run serve
```

### Project 빌드
```
npm run build
```

### Project 린트 검사 후 포맷
```
npm run lint
```