const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
 {
  chatId: {
   type: String,
  },
  userId: { type: String, ref: 'user' },
  text: {
   type: String,
  },
 },
 {
  timestamps: true,
 }
);

module.exports = mongoose.model('message', MessageSchema);
