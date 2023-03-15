const { addMessage } = require('../controllers/messagesController');
const { createNewMessage, getAllMessages } = require('../heplers/hepler');

const users = new Map();

const defaultUser = {
 id: 'anon',
 name: 'Anonymous',
};

class Connection {
 constructor(io, socket) {
  this.socket = socket;
  this.io = io;
  socket.on('getMessages', () => this.getMessages());
  socket.on('message', (value) => this.handleMessage(value, socket));
  socket.on('disconnect', () => this.disconnect());
  socket.on('connect_error', (err) => {
   console.log(`connect_error due to ${err.message}`);
  });
 }

 sendMessage(message) {
  this.io.sockets.emit('message', message);
 }

 getMessages() {
  getAllMessages().then((messages) => {
   messages.forEach((message) => this.sendMessage(message));
  });
 }

 handleMessage(value, socket) {
  createNewMessage(value).then((message) => {
   this.sendMessage(message);
  });
 }

 disconnect() {
  users.delete(this.socket);
 }
}

const chat = (io) => {
 io.on('connection', (socket) => {
  console.log('New User Connected:', socket.id);
  new Connection(io, socket);
 });
};

module.exports = chat;
