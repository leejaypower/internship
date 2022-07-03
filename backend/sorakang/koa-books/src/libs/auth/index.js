const { getToken } = require('./tokenFunc');
const tokenFunc = require('./tokenFunc');
const { AuthorizationDirective } = require('./AuthorizationDirective');
const { hashFunc } = require('./hashFunc');

module.exports = {
  getToken, tokenFunc, AuthorizationDirective, hashFunc,
};
