const admin = require('firebase-admin');

const User = require('../models/user');

const authorize = async (req, res, next) => {
  const { token } = req.body;
  const resp = await admin.auth().verifyIdToken(token);

  try {
    const user = await User.findOne({ googleId: resp.uid });
    if (!user) {
      const newUser = new User({
        name: resp.name,
        email: resp.email,
        googleId: resp.uid,
        createdAt: Date.now(),
        ownSessions: [],
        visitedSessions: [],
      });

      await newUser.save();
      res.status(201).json({ message: 'User created' });
    }
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }

  res.status(200).json(req.body);
};

module.exports = {
  authorize,
};
