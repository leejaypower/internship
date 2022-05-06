const userResolvers = require('./user');
const movieResolvers = require('./movie');
const reviewResolvers = require('./review');

module.exports = [userResolvers, movieResolvers, reviewResolvers];

/* resolver function structure
 register(root, args, context, info) { }
 root :
 args: graphql query로 제공되는 data req payload
 context: globally accessible data
 info : 올바른 쿼리에 대한 특정 정보를 포함하는 객체?

*/
