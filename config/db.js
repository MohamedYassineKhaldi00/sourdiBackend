const mongoose = require('mongoose');

const connection = mongoose.createConnection('mongodb+srv://sourditn:w58kwehvHZroQGjT@sourdi.dymm7.mongodb.net/?retryWrites=true&w=majority&appName=sourdi', {
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
