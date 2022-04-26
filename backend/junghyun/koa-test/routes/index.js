const Router = require('koa-router');
const {
  UserController,
  PostingController,
  CommentController,
} = require('../controllers');
const isAuthenticated = require('../policies/isAuthenticated');

const router = new Router();

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);

router.post('/postings', isAuthenticated, PostingController.create);
router.get('/postings', isAuthenticated, PostingController.find);
router.get('/postings/:id', isAuthenticated, PostingController.findOne);
router.delete('/postings/:id', isAuthenticated, PostingController.destroy);
router.put('/postings/:id', isAuthenticated, PostingController.update);

router.post('/comments', isAuthenticated, CommentController.create);

module.exports = router;
