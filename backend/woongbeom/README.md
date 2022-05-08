# About
---
Barogo Internship project
backend / Woongbeom Heo

## Get Started
```
// 1. docker 실행
// 해당 경로(/internship/docker/)로 이동하여 docker-compose.yml 실행
$ cd internship/docker
$ docker-compose up -d --build
// 2. npm 패키지 설치
// internship/backend/woongbeom 에서
$ npm install
// 3. 서버 실행
$ npm run start:dev
```

## 환경 변수 설정
현재 .env 환경에서 사용하고 있습니다.
```
// .env
$ npm run start:dev
```

### DB Config 환경변수명
```
DATABASE_USERNAME=DB_USERNAME
DATABASE_PASSWORD=DB_PASSWORD
DATABASE_NAME=DB_DATABASE
DATABASE_HOST=DB_HOST
DATABASE_PORT=DB_PORT
DATABASE_DIALECT=DB_DIALECT
```