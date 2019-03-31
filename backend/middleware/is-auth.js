const admin = require('firebase-admin');

module.exports = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error('Not authenticated');
    error.statusCode = 401;

    next(error);
  }

  const token = authHeader.split(' ')[1];
  try {
    const response = await admin.auth().verifyIdToken(token);
    req.locals = {
      userData: response,
    };

    next();
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};
