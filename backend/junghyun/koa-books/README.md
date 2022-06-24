# About 
---
### Postman API 문서

- [API 문서 바로가기](https://documenter.getpostman.com/view/20459763/UyxgJTME)

## 환경 변수 설정
---
- 현재 프로젝트에서는 아래의 각각 명령어에 따라 다른 .env 파일을 읽어와 서버를 실행합니다.
```
// .env 사용
$ npm run start
// .env.development 사용
$ npm run dev
// .env.test 사용
$ npm run test
```


## Get Started

### 프로젝트 실행 (개발 모드 실행)

1. docker 실행

- ~/internship/docker 경로로 이동
- docker-compose.yml 실행 ($ docker-compose up -d --build)

2. npm 패키지 설치

- ~internship/backend/junghyun/koa-books 이동
- 패키지 설치 ($ npm install)

3. 서버 실행

- $ npm run dev

### docker-compose 를 활용한 프로젝트 실행

1. postgres 실행

- ~/internship/docker 경로로 이동
- $ docker-compose up -d --build internship-postgres

2. sequelize-cli를 사용해 schema생성 및 table migrate

- ~internship/backend/junghyun/koa-books 경로로 이동
- $ npx sequelize-cli db:create
- $ npx sequelize-cli db:migrate
- $ npx sequelize-cli db:seed:all

3. 나머지 컨테이너 실행

- ~/internship/docker 경로로 이동
- $ docker-compose up -d --build

---
