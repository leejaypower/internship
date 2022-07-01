FROM node:16-alpine

LABEL maintainer="gigyesik@barogo.com"

RUN apk add dumb-init

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY package.json package-lock.json ./

RUN npm ci --omit-dev

COPY . .

EXPOSE 4005

CMD [ "dumb-init", "node", "index.js" ]
