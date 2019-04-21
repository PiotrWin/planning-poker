const Session = require('../models/session');

const add = async (req, res) => {
  const { uid, name } = req.body;
  console.log(uid, name);

  res.status(200).json({ ok: true });
};

module.exports = {
  add,
};
