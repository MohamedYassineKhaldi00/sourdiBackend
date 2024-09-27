const mongoose = require('mongoose');
require('dotenv').config();
const connectionURI = process.env.MONGODB_URI;


const connection = mongoose.createConnection(connectionURI, {
  connectTimeoutMS: 0,  // No time limit for initial connection
  socketTimeoutMS: 0,   // No time limit for ongoing socket communication
})
  .on('open', () => {
    console.log('MongoDB Connected');
  })
  .on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });

module.exports = connection;