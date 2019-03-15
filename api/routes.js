const router = require('express').Router();
router.use('/users', require('./controllers/user.controller'));

module.exports = router;
