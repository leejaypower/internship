# The Weather Channel With Vue

- `Vue.js`와 `Vuetify`, `Vue Router`, `Vuex`, `OpenWeather API` 등등을 이용해 만든 날씨정보를 알려주는 웹페이지입니다. fakeServer와 fakeAxios를 통해 JWT로 서버와 통신하는 듯한 효과를 내었습니다.
- 현재 코드는 `fakeServer`에서 JWT를 만들어 decode해서 클라이언트쪽으로 `accessToken과` `refreshToken과` 함께 `accessTokenExpireTime`과 `refreshTokenExpireTime`을 전달해준다는 시나리오를 바탕으로 작성되었습니다.

# Project Design

- Dashboard(메인 페이지)에서 현재 위치 또는 원하는 지역을 검색해 간단한 날씨 정보를 볼 수 있습니다.
- 현재 지역 좌표를 Web API의 Navigator.geolocation를 사용해 구합니다.
- 해당 좌표를 [Naver Reverse Geocoding](https://api.ncloud-docs.com/docs/ai-naver-mapsreversegeocoding-gc)을통해 행정동명으로 변환합니다.
- 사용자 검색 기능을 지원하기 위해 [Daum 우편번호 서비스 API](https://postcode.map.daum.net/guide)로 주소를 검색한 후 [Naver Geocoding](https://api.ncloud-docs.com/docs/ai-naver-mapsgeocoding-geocode)를이용해 해당 주소를 좌표로 바꾸어 사용자가 검색한 장소 날씨정보를 가져와 보여줍니다.
- 상세정보를 원하는 사용자가 아래 세 가지 상황에서 로그인 전에는 모달창을 띄우고회원가입 또는 로그인을 유도합니다. 로그인 후에는 해당 상세 페이지로 이동할 수있습니다.

  1. Header Navigation에서 '요일별 날씨 보기'(7일), '시간별 날씨 보기 '(48시간 )', '전체 날씨 보기' 중 하나를 클릭
  2. Dashboard의 ‘오늘 날씨’카드에 있는 '자세히' 버튼을 클릭
  3. Dashboard의 ‘일일예보’ 카드를 클릭

- OpenWeather에서 사용할 API의 종류는 [One Call API 1.0](https://openweathermap.org/api/one-call-api)입니다.

* 상세 기획서 링크는 아래와 같습니다. [The Weather Channel 기획서](https://www.notion.so/barogohq/The-Weather-Channel-ecd58fd687b04be79df8eff909f9ade6)

# Features

## 1. fakeServer와 fakeAxios 만들기[5주차]

** 해당 프로젝트 실행 시 회원가입 없이 바로 로그인할 수 있는 테스트계정 정보는 다음과 같습니다.
```
email: test@test.com
password: test

email: test1@test.com
password: test
```

- `accessToken` 만료기간은 3분, `refreshToken` 만료기간은 하루로 설정되어 있으며 `/fakeserver/services/JWT/makeJWT.js`에서 해당 만료기간 설정을 바꿀 수 있습니다.

- 클라이언트에서는 `vuex store`에 서버로 부터 발급된 `accessToken`이 저장되어 있고, `refreshToken`은 브라우저 `localStorage`에 저장되어 있습니다.

- 클라이언트에서 `fakeAxios`를 사용하는 관련 페이지 및 컴포넌트 목록은 다음과 같습니다.
1. 회원가입 페이지
2. 로그인 모달창
3. 내 정보 수정하기 페이지

- `setupFakeAxios`에서 `fakeAxios.interceptor.response.use` error callback에서의 호출 순서는 다음과 같습니다.
```
  fakeAxios.interceptor.response.use((response) => response, async (error) => {
    const originalRequest = error.config
    const { method, url, data } = originalRequest

    // 1. fakeServer에서 accessToken 또는 refreshToken 확인 시 만료되었다면 401에러가 반환되는데

    if (error.response.status === 401) {

      // 2. refreshToken가 만료되었다면

      if (url === '/check-refreshToken') {

        // 3. 바로 error.response를 반환해 로그아웃해서 localStorage에서 refreshToken을 삭제하기

        return Promise.reject(error.response)
      }

      // 4. refreshToken이 localStorage에 저장되어 있는 상황에서 api요청을 보냈을 때 accessToken가 만료되어 401에러가 발생한 상황이라면
      
      const refreshToken = localStorage.getItem(REFRESH_TOKEN)
      if (refreshToken) {

        // 5. 새로운 accessToken 갱신하기

        await store.dispatch('user/renewalAccessTokenInfo')

        // 6. 이때 refreshToken이 만료된 상황이라면 3번으로 이동하게 될 것이고

        if (store.getters['user/accessToken']) {

          // 7. 6번이 아니라면 새로운 accessToken으로 401에러가 발생한 요청을 그대로 다시 서버로 보내기

          requestInstance(ACCESS_TOKEN)
          await fakeAxios[method](url, data)
        }

        // 9.refreshToken이 만료된 상황이라면 갱신되지 않은 기존 요청의 error.response를 반환하기

        return Promise.reject(error.response)
      }
    }

    // 10. 401 에러가 아니거나 401 에러임에도 2~9번까지의 로직에 해당하지 않는 경우 error객체 반환하기
    
    return Promise.reject(error)
  })
```

## 2. DashBoard, 요일별, 시간별, 전체 날씨보기 총 4가지 페이지로 구성하기

### DashBoard Page(홈화면)[6주차]

- 주소로 위치 검색 기능 구현
- 새로고침 버튼 구현, 클릭 시 데이터 실시간으로 가져오기, 버튼 클릭 안하면 1시간간격으로 가져오기
- 오늘 날씨(오늘 날짜, 날씨 아이콘, 기온, 체감온도, 예상 강수량, 풍속) 카드 보여주기
- 일일예보(5일) 카드 보여주기
- Scroll To Top Button 기능 추가하기

### 시간별 날씨 보기 페이지(상세 페이지)[7주차]

- 오늘을 기준으로 48시간의 시간별 날씨 상세 표(날씨 아이콘, 기온, 체감온도, 예상강수량, 습도, 바람, 자외선 지수, 구름량 표시)를 content으로 포함한 expansion-panels 구현하기

### 요일별 날씨 보기 페이지(상세 페이지)[7주차]

- 상위 탭으로 7일 날씨 tabs로 가로슬라이드 구현하기
- 상위 탭 중 하나 클릭 시 해당 요일의 날씨 상세 표(날씨 아이콘, 기온, 체감온도, 예상강수량, 습도, 바람, 자외선 지수, 구름량 표시) 보여주기

### 전체 날씨 보기 페이지(상세 페이지)[8주차]

- 주소로 위치 검색 버튼 넣기
- 시간별 날씨 정보 기온, 강수량 차트로 보여주기, 바람 정보 카드로 보여주기
- 요일별 날씨 정보 기온, 강수량 차트로 보여주기, 바람 정보 카드로 보여주기

### 날씨 진단하기 페이지(상세 페이지)[9주차]

- 현재 위치의 날씨정보와 [기상청 기후평년값](https://data.kma.go.kr/normals/info1.do)을 비교하기

- 기후평년값 데이터(src/data/climaticAverageListKorea.js) 조건 

  |항목|내용| 
  |------|---| 
  |평년값|30년(1991~2020)| 
  |종류|월별 평년값(일반요소)| 
  |지점|전국| 
  |요소|평균 기온, 최고 기온, 최저 기온, 풍속, 강수량|

- 출처: [기상청 기후표](https://data.kma.go.kr/normals/table.do)
### 에러 테스트 페이지[10주차]

 - UI 레이어, API 레이어, 브라우저로 나누어 에러 핸들링하기

|분류|Error Handler| 
|------|---| 
|API|naverGeocodingApiErrorHandler, openWeatherMapApiErrorHandler, fakeAxiosErrorHandler, geolocationPositionErrorHandler| 
|Vue|vueErrorHandler| 
|Window|windowOnErrorHandler, windowOnUnhandledRejectionHandler| 

 - 에러로그 데이터 localStorage에 저장하기

 ### Jest test code 작성 및 validation 고도화하기 [11, 12주차]
 - services layer 회원가입 시 이메일 형식 정규식, 위도 경도 범위 유효성 검사, 날씨 데이터 소수점 한자리로 변환하기 함수 test code 작성하기
 ```
│   ├── services
│   │   ├── __tests__
│   │   │   ├── emailInputRule.test.js
│   │   │   ├── isValidCoords.test.js
│   │   │   └── makeWeatherDataToFixedOne.test.js
```

- store layer user module signup action, weather module getOneCallApi action test code 작성하기
```
│   ├── store
│   │   ├── __tests__
│   │   │   ├── userActions.test.js
│   │   │   └── weatherActions.test.js
```

- view layer signup page submitForm test code 작성하기
```
│       ├── SignUp
│       │   ├── __tests__
│       │   │   └── signup.test.js
│       │   └── index.vue
```
## 3. mobile & pc 반응형 구현하기

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
├── Dockerfile
├── README.md
├── babel.config.js
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
│   │   └── index.js
│   ├── router
│   │   └── index.js
│   └── services
│       ├── checkDuplicatedInfo.js
│       ├── getUserInfoList.js
│       ├── index.js
│       ├── makeJWT.js
│       ├── makeReturn.js
│       └── saveUserInfoAtLocalStorage.js
├── jest.config.js
├── jest.setup.js
├── jsconfig.json
├── nginx.conf
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
│   │   ├── images
│   │   │   ├── buy-local-food.png
│   │   │   ├── climate-average-info.png
│   │   │   ├── electrical-plug.png
│   │   │   ├── kma-main-page.png
│   │   │   ├── logo.png
│   │   │   ├── maintain-room-temperature.png
│   │   │   ├── road-bicycle.png
│   │   │   ├── sustainable-lifecycle.png
│   │   │   └── vegetarian-diet.png
│   │   └── styles
│   │       └── global.scss
│   ├── components
│   │   ├── AppBar.vue
│   │   ├── AuthTypeChip.vue
│   │   ├── DropdownMenu.vue
│   │   ├── EmailInput.vue
│   │   ├── NavigationDrawer.vue
│   │   ├── NicknameInput.vue
│   │   ├── PasswordCheckInput.vue
│   │   ├── PasswordInput.vue
│   │   ├── ScrollToTopBtn.vue
│   │   ├── UserApiResponseAlert.vue
│   │   └── WeatherApiResponseAlert.vue
│   ├── constants
│   │   ├── error-types.js
│   │   ├── index.js
│   │   ├── localStorage-types.js
│   │   ├── modal-types.js
│   │   ├── mutation-types.js
│   │   ├── sheet-types.js
│   │   └── weather-types.js
│   ├── data
│   │   ├── appBarMenuItems.js
│   │   ├── climaticAverageListKorea.js
│   │   ├── dailyChallengeForEarthCardList.js
│   │   ├── dropdownMenuItems.js
│   │   ├── environmentalOrganizationInfoList.js
│   │   ├── index.js
│   │   └── weatherDescriptionKorean.js
│   ├── main.js
│   ├── mixins
│   │   ├── check-refreshtoken-mixin.js
│   │   ├── daum-postcode-mixin.js
│   │   ├── index.js
│   │   ├── openweathermap-icon-mixin.js
│   │   └── responsive-sheet-mixin.js
│   ├── plugins
│   │   └── vuetify.js
│   ├── router
│   │   └── index.js
│   ├── services
│   │   ├── __tests__
│   │   │   ├── emailInputRule.test.js
│   │   │   ├── isValidCoords.test.js
│   │   │   └── makeWeatherDataToFixedOne.test.js
│   │   ├── coordsValidation
│   │   │   ├── checkValidationCause.js
│   │   │   ├── index.js
│   │   │   ├── isValidCoords.js
│   │   │   ├── isValidLatitude.js
│   │   │   ├── isValidLongitude.js
│   │   │   └── makeCoordsValidationResponseInfo.js
│   │   ├── errorHandler
│   │   │   ├── apiHandler
│   │   │   │   ├── fakeAxiosErrorHandler.js
│   │   │   │   ├── geolocationPositionErrorHandler.js
│   │   │   │   ├── naverGeocodingApiErrorHandler.js
│   │   │   │   └── openWeatherMapApiErrorHandler.js
│   │   │   ├── errorCodeTranslator
│   │   │   │   ├── translateFakeAxiosResponseErrorCode.js
│   │   │   │   └── translateNavigatorGeolocationErrorCode.js
│   │   │   ├── index.js
│   │   │   ├── localStorageLogController
│   │   │   │   ├── makeLocalStorageErrorLogList.js
│   │   │   │   └── saveErrorLogAtLocalStorage.js
│   │   │   ├── vueErrorHandler.js
│   │   │   └── windowHandler
│   │   │       ├── windowOnErrorHandler.js
│   │   │       └── windowOnUnhandledRejectionHandler.js
│   │   ├── index.js
│   │   ├── inputUnit
│   │   │   ├── index.js
│   │   │   ├── inputCelsiusUnit.js
│   │   │   ├── inputMeterPerSecondUnit.js
│   │   │   ├── inputMillimeterPerHourUnit.js
│   │   │   └── inputPercentUnit.js
│   │   ├── inputValidation
│   │   │   ├── emailRules.js
│   │   │   ├── index.js
│   │   │   ├── isAgreePrivateInfoUseRule.js
│   │   │   ├── nicknameRules.js
│   │   │   ├── passwordCheckRules.js
│   │   │   └── passwordRules.js
│   │   ├── makeApiResponseInfo.js
│   │   └── makeWeatherDataToFixedOne.js
│   ├── store
│   │   ├── __tests__
│   │   │   ├── userActions.test.js
│   │   │   └── weatherActions.test.js
│   │   ├── index.js
│   │   └── modules
│   │       ├── alert
│   │       │   ├── actions.js
│   │       │   ├── getters.js
│   │       │   ├── index.js
│   │       │   ├── mutations.js
│   │       │   └── state.js
│   │       ├── index.js
│   │       ├── user
│   │       │   ├── actions.js
│   │       │   ├── getters.js
│   │       │   ├── index.js
│   │       │   ├── mutations.js
│   │       │   └── state.js
│   │       └── weather
│   │           ├── actions.js
│   │           ├── getters.js
│   │           ├── index.js
│   │           ├── mutations.js
│   │           └── state.js
│   └── views
│       ├── DashBoard
│       │   ├── components
│       │   │   ├── LoginFormModal.vue
│       │   │   ├── SearchLocationInputCard.vue
│       │   │   ├── SimpleCurrentWeatherCard.vue
│       │   │   ├── SimpleCurrentWeatherCardMainContent.vue
│       │   │   ├── SimpleCurrentWeatherCardSubContent.vue
│       │   │   ├── SimpleDailySlideCard.vue
│       │   │   ├── SimpleDailySlideGroup.vue
│       │   │   └── SimpleDailyWeatherCard.vue
│       │   └── index.vue
│       ├── DetailForecast
│       │   ├── ForecastAll
│       │   │   ├── components
│       │   │   │   ├── ForecastDailyCardGroup.vue
│       │   │   │   ├── ForecastDailyTabItems.vue
│       │   │   │   ├── ForecastHourlyTabItems.vue
│       │   │   │   ├── WindCard.vue
│       │   │   │   └── WindCardGroup.vue
│       │   │   └── index.vue
│       │   ├── ForecastDaily
│       │   │   ├── components
│       │   │   │   ├── ForecastDailySlideCardGroup.vue
│       │   │   │   └── ForecastDailyWeatherTable.vue
│       │   │   └── index.vue
│       │   ├── ForecastDiagonose
│       │   │   ├── components
│       │   │   │   ├── ClimateAverageInfoImage.vue
│       │   │   │   ├── CompareCurrentTemperatureWithAverage.vue
│       │   │   │   ├── CompareCurrentWeatherWithAverage.vue
│       │   │   │   ├── CompareCurrentWeatherWithAverageCard.vue
│       │   │   │   ├── DailyChallengeForEarthCard.vue
│       │   │   │   ├── DailyChallengeForEarthContent.vue
│       │   │   │   ├── EnvironmentalOrganizationSlideGroup.vue
│       │   │   │   ├── KMAMainPageCard.vue
│       │   │   │   └── WeatherProgressLinear.vue
│       │   │   └── index.vue
│       │   ├── ForecastHourly
│       │   │   ├── components
│       │   │   │   ├── ForecastHourlyPanel.vue
│       │   │   │   ├── ForecastHourlyPanelContent.vue
│       │   │   │   └── ForecastHourlyPanelHeader.vue
│       │   │   └── index.vue
│       │   ├── components
│       │   │   ├── ForecastPageTitle.vue
│       │   │   └── TodayWeatherTableTd.vue
│       │   └── index.vue
│       ├── NotFound.vue
│       ├── SignUp
│       │   ├── __tests__
│       │   │   └── signup.test.js
│       │   └── index.vue
│       ├── TestError.vue
│       └── UpdateMyInfo
│           ├── components
│           │   └── UpdatePasswordModal.vue
│           └── index.vue
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

### Run your unit tests

```
"test": "jest",
"test:watch": "jest --watch",
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).