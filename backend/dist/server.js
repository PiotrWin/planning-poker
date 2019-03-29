"use strict";

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _auth = _interopRequireDefault(require("./routes/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

var app = (0, _express.default)();
app.use('/', function (req, res, next) {
  res.status(200).json({
    test: 'dupa'
  });
  console.log('dupa');
});
app.use(function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
});
app.use('/auth', _auth.default);
app.use(function (error, req, res) {
  console.log(error);
  var status = error.statusCode || 500;
  var message = error.message;
  var data = error.data;
  res.status(status).json({
    message: message,
    data: data
  });
});

_mongoose.default.connect(process.env.DB_HOST).then(function () {
  app.listen(4000);
}).catch(console.log);