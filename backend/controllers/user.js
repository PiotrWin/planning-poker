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

const removeSession = async (req, res, next) => {
  try {
    const { id, session_id } = req.params;
    const user = await User.findById(id);
    const { ownSessions, visitedSessions } = user;

    let selectedSet;
    if (ownSessions.find(id => id.toString() === session_id)) {
      selectedSet = 'ownSessions';
    } else if (visitedSessions.find(id => id.toString() === session_id)) {
      selectedSet = 'visitedSessions';
    }

    if (selectedSet) {
      await User.findByIdAndUpdate(
        id, 
        { '$pull': { [selectedSet]: session_id } },
      );
      res.status(200).send(`Removed ${session_id}`);
    } else {
      res.status(404).send('Session with given ID was not found');
    }

  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
};

module.exports = {
  getSessions,
  addSession,
  removeSession
};
