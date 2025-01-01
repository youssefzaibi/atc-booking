const { getLoginUrl, handleCallback } = require('../controllers/controller.login');
const router = require('express').Router();
router.route('/').get(getLoginUrl);
module.exports = router;