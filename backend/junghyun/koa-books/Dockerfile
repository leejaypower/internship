# 베이스 이미지
FROM --platform=amd64 node:16-alpine
RUN apk add dumb-init

LABEL maintainer="haileyjpark@barogo.com"

# 복사할 경로 설정
WORKDIR /usr/src/app

# 프로젝트 파일 복사
COPY package*.json ./

# 라이브러리 설치 : 버전 차이가 생길 경우를 대비해 ci로 설정
RUN npm ci;

# 소스코드 복사 (변경될 경우를 대비해 나중 레이어로 작성)
COPY . .

EXPOSE 4000

#실행
CMD ["dumb-init", "node", "index.js"]
