require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const socketio = require('socket.io');
const connectDB = require('./config/db');
const chat = require('./socket/chat');

const app = express();
const http = require('http').Server(app);
const PORT = process.env.PORT || 4000;

// Connect to database
connectDB();

app.use(express.json({ extended: false }));
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => {
 return res
  .status(200)
  .json({ success: true, message: 'Api is running successfully' });
});

app.use('/api/auth', require('./routes/api/login'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/chat', require('./routes/api/chat'));
app.use('/api/message', require('./routes/api/message'));

let io = socketio(http, {
 cors: {
  origin: '*',
  optionSuccessStatus: 200,
 },
});
chat(io);

http.listen(PORT, () => {
 console.log(`Server listening on ${PORT}`);
});
