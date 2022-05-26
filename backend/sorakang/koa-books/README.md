# 도서관 프로젝트


## About 
---

## Get Started
---

```
// 1. docker 실행
// 해당 경로(/internship/docker/)로 이동하여 docker-compose.yml을 실행

$ cd internship/docker
$ docker-compose up -d --build

// 2. dev.env 파일 설정
// /internship/backend/sorakang/.env.example 을 복사하여
// ~/sorakang/.env.development 생성
// .env.development 내부 환경 변수를 상황에 맞게 수정
// 환경 변수(env)에 관련한 추가 내용은 아래(환경 변수 설정)에 있습니다.

// 3. npm 패키지 설치
// ~/sorakang 에서
$ npm install

// 4. 서버 실행
$ npm run start:dev
```

## 환경 변수 설정
---
현재 프로젝트에서는 아래의 각각 명령어에 따라 다른 .env 파일을 읽어와 서버를 실행합니다.
```
// .env 사용
$ npm run start

// .env.development 사용
$ npm run start:dev

// test.env 사용
$ npm run start:test
```

.env.example 파일은 수정하여 사용할 수 있는 .env의 내용을 담은 템플릿입니다. .env.example 파일의 key값은 각.env의 key 값과 같습니다.

### DB Config 공통 환경변수명
```
DATABASE_USERNAME=DB_USERNAME
DATABASE_PASSWORD=DB_PASSWORD
DATABASE_NAME=DB_DATABASE
DATABASE_HOST=DB_HOST
DATABASE_PORT=DB_PORT
DATABASE_DIALECT=DB_DIALECT
```
책 더미데이터를 생성하는 네이버 Open api key는 노출하면 안되지만, 관련 테스트를 하게될 경우를 위해 아래와 같이 추가하였습니다

CLIENT_ID=ngxU2ME6UIc43RGdfqC1
CLIENT_SECRETE=ucFZNi2wLr

### API문서
계속 업데이트 되고있습니다.
[API-DOC](https://documenter.getpostman.com/view/17998262/UyrAGHgK#84d28637-d522-42d4-b526-a51a5dcecf9d)