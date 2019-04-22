const Session = require('../models/session');

const add = async (req, res, next) => {
  try {
    const { uid, name } = req.body;
    const session = new Session({
      name,
      createdBy: uid,
    });

    const result = await session.save();
    res.status(201).json({ result });
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
