const MessageModel = require('../models/Message');

const createNewMessage = async (payload) => {
 const message = new MessageModel({
  chatId: 'ChatId',
  userId: payload.userId,
  text: payload.text,
 });
 try {
  await message.save();
  return message.populate('userId', 'username email');
 } catch (error) {
  console.log(error);
 }
};
const getAllMessages = async () => {
 try {
  return await MessageModel.find()
   .populate('userId', 'username email')
   .sort({ createdAt: 1 });
 } catch (error) {
  console.log(error);
 }
};
module.exports = { createNewMessage, getAllMessages };
