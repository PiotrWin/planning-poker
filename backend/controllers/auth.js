const User = require('../models/user');

const authorize = async (req, res, next) => {
  try {
    const { userData } = req.locals;
    const user = await User.findOne({ gid: userData.uid });

    if (user) {
      res.status(200).json({ 
        id: user._id,
        gid: user.gid, 
      });
    } else {
      const newUser = new User({
        gid: userData.uid,
        name: userData.name,
        email: userData.email,
      });
      const result = await newUser.save();
      
      res.status(201).json({ 
        id: result._id,
        gid: result.gid,
      });
    }
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
};

module.exports = {
  authorize,
};
