const Router = require('@koa/router');
const usersRouter = new Router();

const users = require('../controller/users');

usersRouter.get('/:name', users.get);
usersRouter.post('/:name', users.post);
usersRouter.patch('/:name', users.patch);

module.exports = usersRouter;
