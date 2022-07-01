const { getToken } = require('./tokenFunc');
const { isValidToken } = require('./isValidToken');
const { AuthorizationDirective } = require('./AuthorizationDirective');
const { hashFunc } = require('./hashFunc');

module.exports = {
  getToken, isValidToken, AuthorizationDirective, hashFunc,
};
