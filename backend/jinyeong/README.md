# About 
## Postman API 문서

[API 문서 바로가기](https://documenter.getpostman.com/view/17359697/Uz5NjYb1)
<br></br>

## Get Started
### 1. 프로젝트 실행 (개발 모드 실행)

1. docker 실행

- ~/internship/docker 경로로 이동  
`$ cd docker`
- docker-compose.yml 실행  
`$ docker-compose up -d --build`<br></br>


2. npm 패키지 설치

- ~internship/backend/jinyeong 이동  
`$ cd ../backend/jinyeong`
- 패키지 설치  
`$ npm install`<br></br>

3. DB 마이그레이션  
- DB 생성  
 `$ npx sequelize-cli db:create`
- DB 마이그레이션  
`$ npx sequelize-cli db:migrate`
- DB 씨드 데이터 생성  
`$ npx sequelize-cli db:seed:all`<br></br>

4. 서버 실행  
`$ npm run dev`<br></br>

### 2. docker-compose 를 활용한 프로젝트 실행

1. docker 실행

- ~/internship/docker 경로로 이동  
`$ cd docker`
- docker-compose.yml 실행  
`$ docker-compose up -d --build`<br></br>


2. sequelize-cli를 사용해 schema생성 및 table migrate  

- Server 컨테이너 shell 접근  
`$ docker exec -it internship-jinyeong sh`
- DB 생성  
 `$ npx sequelize-cli db:create`
- DB 마이그레이션  
`$ npx sequelize-cli db:migrate`
- DB 씨드 데이터 생성  
`$ npx sequelize-cli db:seed:all`

---
