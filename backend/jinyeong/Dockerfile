FROM node:16-alpine3.16

RUN apk add dumb-init

WORKDIR /src

COPY ["package.json", "package-lock.json", "./"]
RUN npm install

COPY . .

EXPOSE 4003

CMD ["dumb-init", "node", "index.js"]