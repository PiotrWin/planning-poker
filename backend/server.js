const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/auth', authRoutes);

/* eslint-disable-next-line no-unused-vars */
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(process.env.DB_HOST, { useNewUrlParser: true })
  .then(() => {
    app.listen(4000);
  })
  .catch(console.log);
