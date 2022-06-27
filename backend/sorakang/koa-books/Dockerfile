# 베이스 이미지
FROM node:16-alpine

LABEL maintainer="jaeng9@barogo.com"

RUN apk add dumb-init

# 복사할 경로
WORKDIR /usr/src/app

# ENV 설정
ENV NODE_ENV=production

EXPOSE 4002

# package.json 복사
COPY package*.json ./

# 라이브러리 설치
RUN npm ci --only=production

# 소스코드 복사
COPY . .

CMD ["dumb-init", "node", "src/index.js"]