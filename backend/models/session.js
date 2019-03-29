import { Schema, model } from 'mongoose';

const sessionSchema = new Schema({
  name: {
    type: String,
    required: 'true',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  clients: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

export default model('Session', sessionSchema);
