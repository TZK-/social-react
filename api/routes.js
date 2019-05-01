const router = require('express').Router();

router.use(require('./controllers/auth.controller'));
router.use(require('./controllers/user.controller'));
router.use(require('./controllers/friend.controller'));
router.use(require('./controllers/post.controller'));

module.exports = router;
