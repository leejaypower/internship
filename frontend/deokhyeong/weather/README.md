# 목차
 - 오늘의 날씨
 - 기술 스택
 - 폴더 구조
 - Paths(경로)
 - Auth(접근 권한)

# 오늘의 날씨
![스크린샷 2022-05-05 오전 12.33.26.png](https://postfiles.pstatic.net/MjAyMjA1MDVfODIg/MDAxNjUxNzM0OTM1Njc0.ltlp---tWKw8OciSzjAPOw7MoPeir5wn-y8usZ_w7zEg.z7vmabFSgAjLMRkRK7vsTufKI3nt-J7NawSAnq03Xu8g.PNG.john2323/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2022-05-05_%EC%98%A4%EC%A0%84_12.33.26.png?type=w773)

`오늘의 날씨`는 위치 기반 날씨 정보 제공 서비스를 합니다.
- ❗️ [화면 기획서](https://whimsical.com/EEw7ztv5jHRTJoBLT2hAAP)

# 기술 스택
- vue
- vuetify
- vue-router
- vuex
- axios
- vue-chartjs
- jest

# 목표 (순서 유관)

1. 로그인 / 회원가입 localStorage를 이용해 구현 (4,5주차)
    1. 로그인 :  localStorage를 서버라고 생각하고 server에서 토큰을 가져와 저장하는 로직을 구성해본다.
    2. 회원가입 : localStorage를 서버라고 생각하고 server에 저장하는 로직을 구성해본다.
    3. 핵심은 서버**와 소통하는 Layer**를 잘 구성하는 것이라고 생각함 (이것에 대한 고민 필요)
2. 위치 정보 추가 (4,5주차)
    1. 내 정보를 수정하는 마이페이지 대신 즐겨찾는 위치 정보를 계정 정보에 추가하려고 합니다.
        1. **추후 여유가 되어 지도 API를 붙이게 되면** 지도 위에 즐겨찾는 위치정보를 기반으로한 마크업된 페이지를 만들 예정
    2. 해당 내용을 함께하면 auth에 대한 고민을 함께하고 싶음
        1. 위치 정보 즐겨찾기나 위치 정보 서비스는 유저 권한에 따라 접근을 못 하게 하고 싶습니다.
            1. 특별 회원의 권한에서 위치 정보 즐겨찾기에 접근하던 사람이 어느날 일반 회원으로 내려갔을 때 uri라우팅으로 접근 시도를 하면 리다이렉트 시켜주는 것과 같은 auth에 대한 고민
        2. 기본적으로 큰 목표 **1과 2는 JWT token에 대한 고민과 서버와 소통하는 Layer에 대한 고민이 병행** 될 것
3. 날씨 API를 이용한 날씨 View페이지(날씨 목록, 날씨 상세, 날씨 그래프, 표) 동일한 store볼 수 있도록 구현 예정 (6, 7, 8주차)
- 날씨 API : [OpenWeather API](https://openweathermap.org/api)
4. 👀  **Have not to do**
    1. 네이버 지도 API를 이용하여 위치 설정 정보를 지도위에 마크업 해주는 페이지 만들기
    2. 6, 7, 8 주차 안에 모든 Task가 원할하게 돌아갈 때 고려하자

# 폴더 구조

```bash
src
├── App.vue
├── assets
│   ├── config
│   │   └── README.md
│   └── styles
│       └── README.md
├── main.js
├── plugins
│   └── vuetify.js
├── router
│   └── index.js
├── service
│   ├── api
│   │   ├── README.md
│   │   ├── auth
│   │   │   └── index.js
│   │   └── fakeHttp.js
│   └── domain
│       ├── README.md
│       └── auth
│           ├── index.js
│           └── validations.js
├── store
│   ├── auth
│   │   ├── actions.js
│   │   ├── index.js
│   │   └── mutations.js
│   └── index.js
└── ui
    ├── components
    │   ├── BarChart.vue
    │   ├── LogoAndTitle.vue
    │   ├── SubmitCardForm.vue
    │   └── layouts
    └── views
        ├── MainHome.vue
        ├── SignIn.vue
        └── SignUp.vue
```

❗️ 상위 폴더명과 무엇을 하는 것인지만 간략하게 설명하겠습니다.

- [분류 이유(초안)](https://barogohq.notion.site/Vue-Layer-7a1a2202b6a0412db7f510043998fef6)

| 폴더명 | 설명 |
| --- | --- |
| assets | config, image, css처럼 정적인 파일들을 모아놓은 폴더 |
| constants | 범용적으로 사용되는 string을 모아놓은 폴더 |
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
/seven-forecast
/forecast-detail
 /table
 /graph
/mypage
 /location-add
```

/ : 홈(광장) 페이지

/sign-in : 로그인 페이지

/sign-up : 회원가입 페이지

/seven-forecast: 7일 예보 목록 페이지

/forecast-detail : 상세 예보 페이지

- forecast-detail/table : (기본값) 상세 예보 테이블 뷰 페이지
- forecast-detail/graph : 상세 예보 그래프 뷰 페이지

 /mypage : 마이 페이지

- mypage/location-add : 위치 설정 목록 추가 페이지

/404 : Not Found 페이지

 # Auth 접근 권한
| Path | redirect | 비회원 | 일반 회원 | 특별 회원 |
| --- | --- | --- | --- | --- |
| / | /sign-in | 🔴 | 🟢 | 🟢 |
| /sign-in | / | 🟢 | 🔴 | 🔴 |
| /sign-up | / | 🟢 | 🔴 | 🔴 |
| /seven-forecast | /sign-in | 🔴 | 🟢 | 🟢 |
| /forecast-detail/[table,graph] | /sign-in | 🔴 | 🟢 | 🟢 |
| /mypage | /sign-in | 🔴 | 🟢 | 🟢 |
| /mypage/location-add | 회원 :  /, 비회원 : /sign-in | 🔴 | 🔴 | 🟢 |
| /* | /404 | 🔴 | 🔴 | 🔴 |
