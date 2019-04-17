const router = require('express').Router();

router.use(require('./controllers/post.controller'));
router.use(require('./controllers/user.controller'));
router.use(require('./controllers/auth.controller'));

module.exports = router;
