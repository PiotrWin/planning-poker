const User = require('../models/user');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const { 
    userData: {
      uid: gid,
    },
  } = req.locals;
  const user = await User.findById(id);
  
  if (user.gid !== gid) {
    const error = new Error('Not authorized');
    error.statusCode = 403;

    next(error);
    return;
  }

  next();
};