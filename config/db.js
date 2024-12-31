const mongoose = require('mongoose');
mongoDB_connectionString = process.env.MONGODB_URI

// 'mongodb://localhost:27017'
const connection = mongoose.createConnection(mongoDB_connectionString).on('open',() => {
    console.log('MongoDb Connected');
}).on('error',() => {
    console.log('MongoDb connection error')
})


module.exports =  connection;
