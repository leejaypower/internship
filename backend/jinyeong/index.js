require('./common/util/env');

const http = require('http');
const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const { createApolloServer } = require('./graphQL');

const app = new Koa();

const port = 4000;

const router = require('./routes');

const startServer = async () => {
  const httpServer = http.createServer();
  const apolloServer = createApolloServer(httpServer);

  await apolloServer.start();

  app
    .use(cors())
    .use(bodyParser())
    .use(logger())
    .use(router.routes())
    .use(router.allowedMethods());

  apolloServer.applyMiddleware({ app, path: '/graphql' });

  httpServer.on('request', app.callback());

  httpServer.listen(port, () => console.log(`Server is now running on http://localhost:${port}`));
};

startServer();
