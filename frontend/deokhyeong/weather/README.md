# 목차
 - 오늘의 날씨
 - 기술 스택
 - 폴더 구조
 - Paths(경로)
 - Auth(접근 권한)
 - 실행 명령어
# 오늘의 날씨
![스크린샷 2022-05-05 오전 12.33.26.png](https://postfiles.pstatic.net/MjAyMjA1MDVfODIg/MDAxNjUxNzM0OTM1Njc0.ltlp---tWKw8OciSzjAPOw7MoPeir5wn-y8usZ_w7zEg.z7vmabFSgAjLMRkRK7vsTufKI3nt-J7NawSAnq03Xu8g.PNG.john2323/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2022-05-05_%EC%98%A4%EC%A0%84_12.33.26.png?type=w773)

`오늘의 날씨`는 위치 기반 날씨 정보 제공 서비스를 합니다.
- ❗️ [화면 기획서](https://whimsical.com/EEw7ztv5jHRTJoBLT2hAAP)

# 기술 스택
- vue
- vuetify
- vue-chartjs
- vue-router
- vuex
- axios
- jest
- uuid

# 구현 순서

1. 로그인 / 회원가입 localStorage를 이용해 구현 (4,5주차)
    - 로그인 :  localStorage를 서버라고 생각하고 server에서 토큰을 가져와 저장하는 로직을 구성해본다.
    - 회원가입 : localStorage를 서버라고 생각하고 server에 저장하는 로직을 구성해본다.
    - 서버**와 소통하는 Layer**를 구성 (FakeServer 구현)
    - uri라우팅으로 로그인 되지 않은 회원에대한 라우팅 기능 구현 (로그인 페이지로 이동)
2. 위치 정보 추가 (4,5주차)
    - 마이페이지 내에 계정 정보 수정과 즐겨찾는 위치 정보 기능 구현
3. 날씨 API를 이용한 날씨 View페이지(날씨 목록, 날씨 상세, 날씨 그래프, 표) 동일한 store볼 수 있도록 구현 (6, 7, 8주차)
    - 홈 페이지 (현재 날씨 페이지 정보 확인 가능)
    - 주간 날씨 목록 페이지 구현(API 한계로 당일과 다음날 만 상세페이지 날씨 확인 가능)
    - 상세 페이지 날씨 (그래프, 표)로 확인 가능
- 날씨 API : [OpenWeather API](https://openweathermap.org/api)

# 폴더 구조

```bash
weather
├── Dockerfile
├── mocks
│   └── fakeServer
├── public
│   ├── data
│   └── images
├── src
│   ├── App.vue
│   ├── constants
│   │   ├── colors
│   │   ├── ruleSentences
│   │   ├── tokenNames
│   │   └── weatherDescriptions
│   ├── lib
│   │   ├── fakeHttp
│   │   │   └── interceptor
│   │   ├── http
│   │   │   └── interceptor
│   │   ├── locationHttp
│   │   └── naverHttp
│   ├── main.js
│   ├── plugins
│   │   ├── vuetify.js
│   │   └── windowErrorLogger.js
│   ├── router
│   │   ├── index.js
│   │   └── routes.js
│   ├── service
│   │   ├── api
│   │   │   ├── auth
│   │   │   ├── error
│   │   │   ├── location
│   │   │   └── weather
│   │   ├── domain
│   │   │   ├── auth
│   │   │   ├── day
│   │   │   ├── error
│   │   │   ├── location
│   │   │   └── weather
│   │   └── mapping
│   │       ├── errorMapping
│   │       ├── locationMapping
│   │       ├── userMapping
│   │       └── weatherMapping
│   ├── store
│   │   ├── alert
│   │   ├── auth
│   │   ├── error
│   │   ├── loading
│   │   └── weather
│   ├── ui
│   │   ├── components
│   │   │   └── layout
│   │   └── views
│   │       ├── ErrorTest
│   │       ├── ForecastDetail
│   │       │   ├── WeatherGraph
│   │       │   ├── WeatherTable
│   │       │   └── WeatherViewSwitch
│   │       ├── LocationAdd
│   │       ├── MainHome
│   │       │   └── CurrentWeather
│   │       ├── MyPage
│   │       │   └── SelectedListCardForm
│   │       ├── NotFound
│   │       │   └── index.vue
│   │       ├── OneWeekForecast
│   │       │   └── DailyWeatherCard
│   │       │ 
│   │       ├── SignIn
│   │       │  
│   │       └── SignUp
│   │        
│   └── utils
│       └── test
```

❗️ 상위 폴더명과 무엇을 하는 것인지만 간략하게 설명하겠습니다.

참고) 폴더 구조를 나누며 한 고민 개인적인 고민 ([레이어에 대한 고민](https://www.notion.so/barogohq/a8ce919f06f145c69a3302fa12dab2dc))

| 폴더명 | 설명 |
| --- | --- |
| mocks | fakeServer를 구축하면서 mock이란 개념으로 이곳에 모아놓음 |
| public | image, css, json처럼 정적인 파일들을 모아놓은 폴더 |
| constants | 범용적으로 사용되는 string을 모아놓은 폴더 |
| lib | axios, dayjs같은 기본 세팅을 라이브러리의 기본 세팅을 모아놓은 폴더 |
| utils | 공용으로 사용될 유틸리티 성격의 함수를 모아놓은 폴더 |
| plugins | Vue Plugin을 모아놓은 폴더 |
| router | vue-router 설정 관련 폴더 |
| service | api : 서버와 통신하는 로직 , domain : api로 받아온 데이터를 다루는 비즈니스 로직을 모아놓은 폴더 |
| store | Vuex store관련 파일을 모아놓은 폴더 |
| ui | components, views 등 화면에 보여주는 컴포넌트로 구성된 폴더 |

# Paths(경로)
페이지별 상세 기획은 링크의 기획서를 함께 참고해주세요
- ❗️ [상세 기획서 : 자세한 사항은 링크 참조해주세요](https://whimsical.com/EEw7ztv5jHRTJoBLT2hAAP)

```bash
/
/sign-in
/sign-up
/one-week-forecast
/forecast-detail
 /table
 /graph
/mypage
 /location-add
```

/ : 홈(광장) 페이지

/sign-in : 로그인 페이지

/sign-up : 회원가입 페이지

/one-week-forecast: 주간 예보 목록 페이지

/forecast-detail : 상세 예보 페이지

- forecast-detail/table : (기본값) 상세 예보 테이블 뷰 페이지
- forecast-detail/graph : 상세 예보 그래프 뷰 페이지

 /mypage : 마이 페이지

- mypage/location-add : 위치 설정 목록 추가 페이지

/404 : Not Found 페이지

 # Auth 접근 권한
| Path | redirect | 비회원 | 회원 |
| --- | --- | --- | --- |
| / | /sign-in | 🔴 | 🟢 |
| /sign-in | / | 🟢 | 🔴 |
| /sign-up | / | 🟢 | 🔴 |
| /one-week-forecast | /sign-in | 🔴 | 🟢 |
| /forecast-detail/[table,graph] | /sign-in | 🔴 | 🟢 |
| /mypage | /sign-in | 🔴 | 🟢 |
| /mypage/location-add | 회원 :  /, 비회원 : /sign-in | 🔴 | 🔴 |
| /* | /404 | 🔴 | 🔴 |

# 실행 명령 안내
dev 서버 실행 : `npm run serve`
build 실행 : `npm run build`
test 코드 실행 : `npm run test`
test 코드 실행(watch모드, 커밋 기준 변경점만 테스트) : `npm run test:watch`
test 코드 실행(watchAll모드, 커밋 기준 변경점만 테스트) : `npm run test:watch-all`
lint 검사 : `npm run lint`
docker 이미지 생성: `npm run docker:build`
docker 컨테이너 실행: `npm run docker:run`