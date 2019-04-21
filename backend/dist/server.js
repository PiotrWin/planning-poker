"use strict";

var dotenv = require('dotenv');

dotenv.config();

var express = require('express');

var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var fbadmin = require('firebase-admin');

var serviceAccount = require('./serviceAccount');

var authRoutes = require('./routes/auth');

var app = express();
var port = 4000;
fbadmin.initializeApp({
  credential: fbadmin.credential.cert(serviceAccount),
  databaseURL: process.env.FB_DB_URL
});
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use('/auth', authRoutes);
/* eslint-disable-next-line no-unused-vars */

app.use(function (error, req, res, next) {
  console.log(error);
  var status = error.statusCode || 500;
  var message = error.message;
  var data = error.data;
  res.status(status).json({
    message: message,
    data: data
  });
});
mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true
}).then(function () {
  app.listen(port);
  process.once('SIGUSR2', function () {
    app.close(function () {
      process.kill(process.pid, 'SIGUSR2');
    });
  });
  console.log(">> Server started on port ".concat(port));
})["catch"](console.log);