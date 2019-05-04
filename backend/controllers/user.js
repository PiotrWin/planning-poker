const ObjectId = require('mongoose').Types.ObjectId;
const Session = require('../models/session');
const User = require('../models/user');

const addSession = async (req, res, next) => {
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

    res
      .status(201)
      .json({ id: _id, name });
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
};

const getSessions = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User
      .findById(id)
      .populate({ path: 'ownSessions', select: 'name' })
      .populate({ path: 'visitedSessions', select: 'name' });
    const { ownSessions, visitedSessions } = user;

    res
      .status(200)
      .json({ ownSessions, visitedSessions });
  } catch (e) {
    if (!e.statusCode) {
      e.statucCode = 500;
    }
    next(e);
  }
};

module.exports = {
  addSession,
  getSessions,
};