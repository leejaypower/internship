# About 
---

## Get Started
---

```
// 1. docker 실행
// 해당 경로(/internship/docker/)로 이동하여 docker-compose.yml을 실행
$ cd internship/docker
$ docker-compose up -d --build

// 2. npm 패키지 설치
// ~/junghyun/koa-books 에서
$ npm install
// 3. 서버 실행
$ npm run dev
```

## 환경 변수 설정
---
현재 프로젝트에서는 아래의 각각 명령어에 따라 다른 .env 파일을 읽어와 서버를 실행합니다.
```
// .env 사용
$ npm run start
// .env.development 사용
$ npm run dev
// test.env 사용
$ npm run test
```

### DB Config 공통 환경변수명
```
DATABASE_USERNAME=DB_USERNAME
DATABASE_PASSWORD=DB_PASSWORD
DATABASE_NAME=DB_DATABASE
DATABASE_HOST=DB_HOST
DATABASE_PORT=DB_PORT
DATABASE_DIALECT=DB_DIALECT
```
