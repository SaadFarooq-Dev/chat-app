const MessageModel = require('../models/Message');

const addMessage = async (req, res) => {
 const { chatId, userId, text } = req.body;
 const message = new MessageModel({
  chatId,
  userId,
  text,
 });
 try {
  const result = await message.save();
  res.status(200).json(result);
 } catch (error) {
  res.status(500).json(error);
 }
};

const getMessages = async (req, res) => {
 const { chatId } = req.params;
 try {
  const result = await MessageModel.find({ chatId });
  res.status(200).json(result);
 } catch (error) {
  res.status(500).json(error);
 }
};

module.exports = {
 addMessage,
 getMessages,
};
