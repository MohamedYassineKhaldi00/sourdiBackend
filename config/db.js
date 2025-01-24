const mongoose = require('mongoose');
require('dotenv').config();
const connectionURI = process.env.MONGODB_URI;


const connection = mongoose.createConnection(connectionURI, {  
    tls: true, // Explicitly enable TLS

})
  .on('open', () => {
    console.log('MongoDB Connected');
  })
  .on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });

module.exports = connection;

// const mongoose = require('mongoose');

// // mongodb+srv://sourditn:w58kwehvHZroQGjT@sourdi.dymm7.mongodb.net/
// const connection = mongoose.createConnection('mongodb://localhost:27017').on('open',() => {
//     console.log('MongoDb Connected');
// }).on('error',() => {
//     console.log('MongoDb connection error')
// })


// module.exports =  connection;
