require('./common/util/env');

const http = require('http');
const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const { errorResponse } = require('./middleware');
const { createApolloServer } = require('./graphQL');

const { producers, consumers } = require('./kafka');

const httpServer = http.createServer();

const apolloServer = createApolloServer(httpServer);

const port = process.env.PORT || 4000;
const app = new Koa();

const router = require('./routes');

const startServer = async () => {
  await apolloServer.start();

  await consumers.dueDateMailer.start();
  await producers.dueDateScheduler.start();

  app
    .use(cors())
    .use(bodyParser())
    .use(logger())
    .use(async (ctx, next) => {
      try {
        await next();
      } catch (err) {
        console.log(err);
        errorResponse.restApiErrorResponse(ctx, err);
      }
    })
    .use(router.routes())
    .use(router.allowedMethods());

  apolloServer.applyMiddleware({ app, path: '/graphql' });

  httpServer.on('request', app.callback());

  httpServer.listen(port, () => console.log(`Server is now running on http://localhost:${port}`));
};

startServer();
