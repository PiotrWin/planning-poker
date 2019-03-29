import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  googleToken: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  ownSessions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Session',
    },
  ],
  visitedSessions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Session',
    },
  ],
});

export default model('User', userSchema);
