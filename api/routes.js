const router = require('express').Router();

router.use(require('./controllers/auth.controller'));
router.use(require('./controllers/user.controller'));
router.use(require('./controllers/friend.controller'));
router.use(require('./controllers/post.controller'));
router.use(require('./controllers/comment.controller'));
router.use(require('./controllers/message.controller'));

module.exports = router;
