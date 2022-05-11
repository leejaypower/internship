# 도서관 프로젝트

아래의 내용은 꾸준히 업데이트 될 예정입니다.

## Get Started

### 프로젝트 실행을 위한 로컬 환경 구성 (개발 모드 실행)

```
// 1. docker 실행
// 해당 경로(/internship/docker/)로 이동하여 docker-compose.yml을 실행

$ cd internship/docker
$ docker-compose up -d --build

// 2. dev.env 파일 설정
// /internship/backend/hareem/.env.example 을 복사하여
// ~/hareem/dev.env 생성
// dev.env 내부 환경 변수를 상황에 맞게 수정
// 환경 변수(env)에 관련한 추가 내용은 아래(환경 변수 설정)에 있습니다.

// 3. npm 패키지 설치
// ~/hareem 에서
$ npm install

// 4. 서버 실행
$ npm run start:dev
```

## 환경 변수 설정

현재 프로젝트에서는 아래의 각각 명령어에 따라
다른 .env 파일을 읽어와 서버를 실행합니다.

```
// .env 사용
$ npm run start

// dev.env 사용
$ npm run start:dev

// test.env 사용
$ npm run start:test
```

.env.example 파일은 수정하여 사용할 수 있는
*.env의 내용을 담은 템플릿입니다.
.env.example 파일의 key값은
각*.env의 key 값과 같습니다.  

```
// .env.example
PORT=PORT_NUMBER

DATABASE_USERNAME=DB_USERNAME
DATABASE_PASSWORD=DB_PASSWORD
DATABASE_NAME=DB_NAME
DATABASE_HOST=DB_HOST
DATABASE_PORT=DB_PORT
DATABASE_DIALECT=DB_DIALECT
```

## 제공 기능

## License

- 해당 프로젝트는 MIT License 입니다.
