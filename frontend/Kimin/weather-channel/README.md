# weather-channel

[TOC]



## 1. 프로젝트 개요

- 작성자 : 김기민
- 시작일자: 2022.5.6
- 인턴십 프론트엔드 본 프로젝트
- 기획안: https://barogohq.notion.site/e38df10e6da84d7a95f7c011bea8eac6

## 2. 레이어구조(작성, 향후 주1회 수정예정)

```
├── README.md
├── babel.config.js
├── jest.config.js
├── jsconfig.json
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.vue
│   ├── assets
│   ├── components
│   │   ├── elements
│   │   └── layouts
│   ├── main.js
│   ├── plugins
│   │   └── vuetify.js
│   ├── router
│   │   └── index.js
│   ├── store
│   │   └── index.js
│   ├── utils
│   │   ├── index.js
│   │   ├── auth.js
│   │   ├── chart.js
│   │   ├── checkLocation.js
│   │   ├── mement.js
│   │   └── weather.js
│   └── views
│       ├── AboutView.vue
│       ├── HomeView.vue
│       ├── afterLogin
│       │   ├── DashBoard.vue
│       │   ├── MyInfo.vue
│       │   └── SearchWeather.vue
│       └── beforeLogin
├── tests
│   └── unit
│       └── example.spec.js
└── vue.config.js
```



# Script 요약

Project setup

```
npm install
```

Compiles and hot-reloads for development

```
npm run serve
```

Compiles and minifies for production

```
npm run build
```

Run your unit tests

```
npm run test:unit
```

Lints and fixes files

```
npm run lint
```

Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
