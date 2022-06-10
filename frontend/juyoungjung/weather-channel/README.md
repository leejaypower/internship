# weather-channel

- Vue.js와 Vuetify, Vue Router, Vuex, OpenWeather API를 이용해 만든 날씨정보를알
  려주는 웹페이지입니다. fakeServer와 fakeAxios를 통해 JWT로 서버와 통신하는듯한
  효과를 내었습니다.
- 현재 코드는 `fakeServer`에서 JWT를 만들어 decode해서 프론트쪽으로
  `accessToken과` `refreshToken과` 함께 `accessTokenExpireTime`과
  `refreshTokenExpireTime`을 전달해준다는 시나리오를 바탕으로 작성되었습니다.
- `accessToken` 만료기간은 3분, `refreshToken` 만료기간은 하루로 설정되어 있으며
  `/fakeserver/services/JWT/makeJWT.js`에서 해당 만료기간 설정을 바꿀 수 있습니
  다.
- 클라이언트에서는 `vuex store`에 서버로 부터 발급된 `accessToken`이 저장되어 있
  고, `refreshToken`은 브라우저 `localStorage`에 저장되어 있습니다.

# Project Design

- Dashboard(메인 페이지)에서 원하는 지역을 검색해 간단한 날씨(오늘 날씨- 날씨 아
  이콘, 예상 강수량, 체감온도, 바람 정보, 일일예보(4일) - 날씨 아이콘과 기온)정
  보를 볼 수 있습니다. 기본 검색지역은 Web API의 Navigator.geolocation를 사용합
  니다.
- 상세정보를 원하는 사용자가 헤더의 '요일별 날씨 보기'(7일), '시간별 날씨 보기
  '(2일) 또는 Dashboard의 ‘오늘 날씨’ 또는 ‘일일예보’ 카드를 클릭하거나 '자세히'
  버튼을 클릭하면 로그인 모달창을 띄우고 회원가입 또는 로그인을 유도합니다.
- OpenWeather에서 사용할 API의 종류는
  ‘[Current weather data](https://openweathermap.org/current)’과
  ‘[One Call API 1.0](https://openweathermap.org/api/one-call-api#data)’이며 사
  용할 데이터 종류는 다음과 같습니다.

- [Current weather data](https://openweathermap.org/current)
  - Built-in API request by city name
- [One Call API 1.0](https://openweathermap.org/api/one-call-api#data)
  - Current weather
  - Hourly forecast for 48 hours
  - Daily forecast for 7 days

[The Weather Channel 기획서](https://www.notion.so/barogohq/The-Weather-Channel-ecd58fd687b04be79df8eff909f9ade6)

# Features

## 1. 각 날씨데이터 api로 가져오기 전에 로딩창 구현

## 2. 요일별, 시간별 날씨보기 총 2가지 탭 구성

### DashBoard Page(main page)

- 헤더 만들기
- 도시로 위치 검색 기능 구현
- 새로고침 버튼 구현, 클릭 시 데이터 실시간으로 가져오기, 버튼 클릭 안하면 1시간
  간격으로 가져오기
- 오늘 날씨(날짜, 요일, 날씨 아이콘, 예상 강수량, 체감온도, 바람) 카드 보여주기
- 일일예보(4일) 카드 보여주기

### Today Detail Info Page(상세 페이지)

- 오늘을 기준으로 2일치의 시간별 날씨 상세 표(날씨 아이콘, 예상 강수량, 체감온도
  , 습도, 바람, 자외선 지수, 일출, 일몰 표시)를 content으로 포함한
  expansion-panels 구현하기
- Scroll To Top Button 구현

### Week Detail Info Page(상세 페이지)

- 상위 탭으로 7일 날씨 tabs로 표시, 가로슬라이드 구현하기
- 탭 안의 content로 상위 탭 중 하나 클릭 시 해당 요일의 날씨 상세 표(날씨 아이콘
  , 예상 강수량, 체감온도, 습도, 바람, 자외선 지수, 일출, 일몰 표시) 넣기

## 3. 회원가입 페이지 form 만들기

## 4. 상세 페이지는 로그인 시 접근 가능, 오늘 날씨 또는 일일예보 카드 클릭 시 로그인 form 모달창 띄우기

## 5. Update MyInfo Page (내 정보 수정하기 페이지)

## 4. mobile & pc 반응형 구현하기

## 5. 사용자 위치 사용 권한 동의 안내 모달창 구현(추가시간 사용 예정)

# Using Libraray

```
    "@mdi/font": "^6.6.96",
    "axios": "^0.27.2",
    "core-js": "^3.8.3",
    "dayjs": "^1.11.1",
    "vue": "^2.6.14",
    "vue-router": "^3.5.1",
    "vuetify": "^2.6.0",
    "vuex": "^3.6.2"
```

# Folder Structure

```
.
├── README.md
├── babel.config.js
├── dist
│   ├── currentWeatherRes.js
│   ├── naverRes.js
│   └── oneCallRes.js
├── fakeAxios
│   ├── index.js
│   └── interceptor.js
├── fakeServer
│   ├── constant
│   │   └── index.js
│   ├── db
│   │   └── index.js
│   ├── index.js
│   ├── middleware
│   │   ├── checkTokenExpireTime.js
│   │   └── isJWTValid.js
│   ├── router
│   │   └── index.js
│   └── services
│       ├── JWT
│       │   ├── index.js
│       │   └── makeJWT.js
│       ├── checkDuplicatedInfo.js
│       ├── getUserInfoList.js
│       ├── makeReturn.js
│       ├── saveUserInfoAtLocalStorage.js
│       └── translateInfoKey.js
├── jest.config.js
├── jsconfig.json
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.vue
│   ├── api
│   │   ├── fakeAxios
│   │   │   ├── interceptorCallback.js
│   │   │   └── setupFakeAxios.js
│   │   ├── index.js
│   │   ├── naverGeocoding.js
│   │   ├── openWeatherMap.js
│   │   └── user.js
│   ├── assets
│   │   ├── logo.png
│   │   └── styles
│   │       └── global.scss
│   ├── components
│   │   ├── AppBar.vue
│   │   ├── AuthTypeChip.vue
│   │   ├── DropdownMenu.vue
│   │   ├── EmailInput.vue
│   │   ├── LoginFormModal.vue
│   │   ├── NavigationDrawer.vue
│   │   ├── NicknameInput.vue
│   │   ├── PasswordCheckInput.vue
│   │   ├── PasswordInput.vue
│   │   ├── ResponseErrorInfoAlert.vue
│   │   ├── ResponseInfoAlert.vue
│   │   └── UpdatePasswordModal.vue
│   ├── constants
│   │   ├── localStorage-types.js
│   │   ├── modal-types.js
│   │   └── mutation-types.js
│   ├── data
│   │   ├── AppBarMenuItems.js
│   │   ├── DropdownMenuItems.js
│   │   └── weatherDescKo.js
│   ├── main.js
│   ├── plugins
│   │   └── vuetify.js
│   ├── router
│   │   └── index.js
│   ├── store
│   │   ├── index.js
│   │   └── modules
│   │       ├── index.js
│   │       ├── user.js
│   │       └── weather.js
│   └── views
│       ├── DashBoard.vue
│       ├── NotFound.vue
│       ├── SignUp.vue
│       ├── UpdateMyInfo.vue
│       └── Weather
│           ├── DetailForecast.vue
│           ├── TodayHourly.vue
│           └── WeekDaily.vue
├── tests
│   └── unit
│       └── dashboard.spec.js
└── vue.config.j
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

### Run your unit tests

```
npm run test:unit
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
