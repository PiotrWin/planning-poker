
const express = require('express');
const http = require('http');
const io = require('socket.io');

const app = express();
const httpServer = http.Server(app);
const ioServer = io(httpServer);

module.exports = {
  app,
  http: httpServer,
  io: ioServer,
};
