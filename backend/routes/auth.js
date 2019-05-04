const express = require('express');
const authController = require('../controllers/auth');
const isAuthenticated = require('../middleware/isAuthenticated');

const router = express.Router();

router.post('/', isAuthenticated, authController.authorize);

module.exports = router;
