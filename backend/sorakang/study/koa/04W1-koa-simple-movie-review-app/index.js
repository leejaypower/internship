const { sequelize } = require('./db/models/index');
const { ApolloServer } = require('apollo-server-koa');
require('dotenv').config();
const Koa = require('koa');
const cors = require('@koa/cors');
const typeDefs = require('./graphql/schemas');
const resolvers = require('./graphql/resolvers');
const context = require('./graphql/context');

const port = 4000;
const app = new Koa();

app.use(cors());

// sequelize sync
// {force:true}
sequelize
  .sync()
  .then(() => {
    console.log('DB connection successful 👍 ');
  })
  .catch((err) => {
    console.log('DB connection failure 👎 ');
    console.error(err);
  });

// secret create
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  introspection: true, // If true, enables schema introspection by clients.
  playground: {
    settings: {
      'schema.polling.enable': false,
    },
  },
});

server.start().then(() => {
  server.applyMiddleware({ app, path: '/api' });
});

/*
You must await server.start() before calling server.
applyMiddleware. You can call other functions on app before or after calling applyMiddleware.
*/

app.listen({ port }, () => {
  console.log(`Server listening on...http://localhost:${port}/api 🚀 🚀 `);
});
