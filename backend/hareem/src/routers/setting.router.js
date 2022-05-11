const Router = require('@koa/router');
const { settingController } = require('../controllers');

const settingRouter = new Router({
  prefix: '/setting',
});

settingRouter.get('/list', settingController.getSettings);
settingRouter.get('/:id', settingController.getSetting);
settingRouter.post('/', settingController.createSetting);
settingRouter.patch('/:id', settingController.updateSetting);
settingRouter.delete('/:id', settingController.deleteSetting);

module.exports = settingRouter;
