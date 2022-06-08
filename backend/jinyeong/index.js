/* eslint-disable no-promise-executor-return */
require('./common/util/env');

const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');

const http = require('http');
const { ApolloServer } = require('apollo-server-koa');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core'); // gracful shutdown
const { typeDefs, resolvers } = require('./graphQL');
const loaders = require('./graphQL/resolvers/dataLoader');

const app = new Koa();

const port = 4000;

const router = require('./routes');

async function startApolloServer() {
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    context: () => ({ loaders }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app
    .use(cors())
    .use(bodyParser())
    .use(logger())
    .use(router.routes())
    .use(router.allowedMethods());

  server.applyMiddleware({ app, path: '/graphql' });

  httpServer.on('request', app.callback());

  httpServer.listen(port, () => console.log(`Server is now running on http://localhost:${port}/graphql`));
}

startApolloServer();
