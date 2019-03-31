const User = require('../models/user');

const authorize = async (req, res, next) => {
  try {
    const { userData } = req.locals;
    const user = await User.findById(userData.uid);

    if (user) {
      res.status(200).json({ id: user._id });
    } else {
      const newUser = new User({
        _id: userData.uid,
        name: userData.name,
        email: userData.email,
      });
      const result = await newUser.save();
      res.status(201).json({ id: result._id });
    }
  } catch (e) {
    console.log('error', e);
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
};

module.exports = {
  authorize,
};
