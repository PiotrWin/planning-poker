const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    created: {
      type: Date,
      default: Date.now(),
    },
    ownSessions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        default: [],
      },
    ],
    visitedSessions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        default: [],
      },
    ],
  },
  { _id: false }
);

module.exports = mongoose.model('User', userSchema);
