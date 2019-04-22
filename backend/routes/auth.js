const express = require('express');
const authController = require('../controllers/auth');
const isAuthenticated = require('../middleware/is-authenticated');

const router = express.Router();

router.post('/', isAuthenticated, authController.authorize);

module.exports = router;
