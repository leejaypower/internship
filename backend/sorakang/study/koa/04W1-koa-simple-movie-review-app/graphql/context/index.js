const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-koa');
const User = require('../../db/models');
require('dotenv').config();

// helper
const verifyToken = async (token) => {
  try {
    if (!token) return null;
    const { id } = await jwt.verify(token, process.env.PASSWORD_SECRETE);
    const user = await User.findByPk(id);
    return user;
  } catch (err) {
    throw new AuthenticationError(err.messages);
  }
};

module.exports = async ({ ctx }) => {
  const token = ctx.request.headers.Authorization;
  const user = await verifyToken(token);
  return { user };
};

// https://github.com/apollographql/apollo-server/blob/main/packages/apollo-server-errors/src/index.ts
