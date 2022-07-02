const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const { ApolloServer } = require('apollo-server-koa');
const { createServer } = require('http');
const { schema } = require('../api/graphql');
const context = require('../api/graphql/context');
const { errorEventListener } = require('../libs').errorHandler;

const port = process.env.PORT || 4000;
const startPlugin = {
  serverWillStart() {
    console.log(`GraphQL Server starting up!${port} 🚀`);
  },
};
async function startApolloServer(app) {
  const httpServer = createServer();
  const apolloServer = new ApolloServer({
    schema,
    context,
    cors: true,
    csrfPrevention: true,
    formatError: (err) => errorEventListener.graphqlErrorHandler(err),
    // debug: false,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }), startPlugin,
    ],
  });

  await apolloServer.start();
  httpServer.on('request', app.callback());
  apolloServer.applyMiddleware({ app, path: '/api' });

  await new Promise(((resolve) => httpServer.listen({ port }, resolve)));
  console.log(`🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`);
  return { apolloServer };
}

module.exports = { startApolloServer };
