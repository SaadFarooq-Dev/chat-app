require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db')

const app = express();
const http = require('http').Server(app);
const PORT = process.env.PORT || 4000;

// Connect to database
connectDB()

app.use(express.json({ extended: false }))
app.use(cors());
app.use(morgan('dev'));

app.get('/',(req,res)=>{
  return res.status(200).json({success: true, message: 'Api is running successfully'})
})
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/login'))


http.listen(PORT, () => {
 console.log(`Server listening on ${PORT}`);
});
