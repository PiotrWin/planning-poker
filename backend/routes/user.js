const express = require('express');
const isAuthenticated = require('../middleware/isAuthenticated');
const isAuthorized = require('../middleware/isAuthorized');
const {
  addSession,
  removeSession,
  getSessions,
} = require('../controllers/user');

const router = express.Router();

router.all('/', isAuthenticated, isAuthorized);

router.get('/:id/sessions', getSessions);

router.post('/:id/sessions', addSession);

router.delete('/:id/sessions/:session_id', removeSession);

module.exports = router;