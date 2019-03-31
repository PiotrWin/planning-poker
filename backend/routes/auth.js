const express = require('express');
const authController = require('../controllers/auth');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.post('/', isAuth, authController.authorize);

module.exports = router;
