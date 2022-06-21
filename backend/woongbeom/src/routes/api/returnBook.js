const Router = require('koa-router');

const controller = require('../../controller');
const { authorization } = require('../../middleware/auth');

const returnRouter = new Router();

returnRouter.post('/', authorization.authorizeUser, controller.apis.returnBook.createReturn);

module.exports = returnRouter;
