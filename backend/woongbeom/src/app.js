const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const http = require('http');
const { ApolloServer } = require('apollo-server-koa');
const graphql = require('./graphql');
const router = require('./routes');
const kafka = require('./kafka');

router
  .get('/', (ctx) => {
    ctx.body = 'main page';
  });

const PORT = process.env.PORT || 4000;

kafka.initkafka();

const application = {
  start: async () => {
    const httpServer = http.createServer();
    const server = new ApolloServer({
      schema: graphql.schema,
      csrfPrevention: true,
      context: ({ ctx }) => ctx,

    });
    await server.start();

    const app = new Koa();

    app
      .use(bodyParser())
      .use(router.routes());

    server.applyMiddleware({ app });
    httpServer.on('request', app.callback());
    const serverListen = await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));
    console.log(`Server is listening on PORT ${PORT}`);
    console.log(`🚀 ApolloServer ready at http://localhost:4000${server.graphqlPath}`);
    return { server, app };
  },
};

module.exports = application;
