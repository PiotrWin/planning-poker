const express = require('express');
const sessionsController = require('../controllers/sessions');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.post('/', isAuth, sessionsController.add);

module.exports = router;
