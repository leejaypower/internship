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
// 2. DB 초기화
// 자동 (/internship/backend/woongbeom/)
$ npm run db:init
// 수동 
$ npx sequelize db:drop
$ npx sequelize db:create
$ npx sequelize db:migrate
$ npx sequelize db:seed
```

## 환경 변수 설정
현재 .env 환경에서 사용하고 있습니다.
```
// .env
```
