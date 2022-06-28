const apis = require('./apis');
const gql = require('./graphql');

module.exports = { apis, gql };

/**
 * gql을 학습한 결과 현재 프로젝트에서 gql controller가 필요한가? 의문이 들었다.
 * 다른 controller 로직을 검토하고, service 메서드를 그대로 리턴할 뿐이라면 걷어낼까 검토중.
 */
