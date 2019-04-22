const express = require('express');
const userController = require('../controllers/user');
const isAuthenticated = require('../middleware/is-authenticated');
const isAuthorized = require('../middleware/is-authorized');

const router = express.Router();

router.post(
  '/:id/sessions',
  isAuthenticated,
  isAuthorized,
  userController.add
);

module.exports = router;