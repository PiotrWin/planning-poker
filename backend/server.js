const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fbadmin = require('firebase-admin');

const serviceAccount = require('./serviceAccount');

const authRoutes = require('./routes/auth');  
const userRoutes = require('./routes/user');

const {
  app,
  http,
  io,
} = require('./servers');

const ports = {
  app: 4000,
  io: 80,
};

fbadmin.initializeApp({
  credential: fbadmin.credential.cert(serviceAccount),
  databaseURL: process.env.FB_DB_URL,
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

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
    const server = app.listen(ports.app);
    http.listen(ports.io);

    io.on('connection', socket => {
      console.log('connected', socket);
    });

    process.once('SIGUSR2', () => {
      server.close(() => {
        process.kill(process.pid, 'SIGUSR2');
      });
    });

    console.log(`>> Server started on port ${ports.app}`);
  })
  .catch(console.log);
