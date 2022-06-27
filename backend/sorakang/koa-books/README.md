# 도서관 프로젝트

# About 

### Postman API 문서
[API-DOC](https://documenter.getpostman.com/view/17998262/UyrAGHgK#84d28637-d522-42d4-b526-a51a5dcecf9d)

## 환경 변수 설정
현재 프로젝트에서는 아래의 각각 명령어에 따라 다른 .env 파일을 읽어와 서버를 실행합니다.

```
// .env 사용
$ npm run start

// .env.development 사용
$ npm run start:dev

// test.env 사용
$ npm run start:test
```

## Get Started

### 프로젝트 실행 (개발 모드 실행)
1. docker 실행
- 해당 경로(/internship/docker/)로 이동
- 하여 docker-compose.yml을 실행

2. npm 패키지 설치
- ~internship/backend/sorakeng/koa-books 이동
- 패키지 설치 ($ npm install)

3. 서버 실행 
- $ npm run start:dev

### docker-compose 를 활용한 프로젝트 실행

1. postgres 실행

- ~/internship/docker 경로로 이동
- $ docker-compose up -d --build internship-postgres

2. sequelize-cli를 사용해 schema생성 및 table migrate

- ~internship/backend/sorakang/koa-books 경로로 이동
- $ npx sequelize-cli db:create
- $ npx sequelize-cli db:migrate
- $ npx sequelize-cli db:seed:all


3. 나머지 컨테이너 실행
- ~/internship/docker 경로로 이동
- $ docker-compose up -d --build
