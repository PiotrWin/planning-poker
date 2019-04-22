const ObjectId = require('mongoose').Types.ObjectId;
const Session = require('../models/session');
const User = require('../models/user');

const add = async (req, res, next) => {
  if (req.body.id !== req.params.id) {
    const error = new Error('Not authorized');
    error.statusCode = 403;
    
    next(error);
    return;
  }
  
  try {
    const { id } = req.params;
    const { name } = req.body;
    const session = new Session({
      name,
      createdBy: ObjectId(id),
    });
    const {
      _id,
      createdBy,
    } = await session.save();

    await User.findByIdAndUpdate(
      createdBy,
      { '$push': { 'ownSessions': ObjectId(_id) } },
    );

    res.status(201).json({ id: _id, name });
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
};

module.exports = {
  add,
};
