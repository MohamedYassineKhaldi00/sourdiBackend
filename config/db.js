const mongoose = require('mongoose');

// mongodb+srv://sourditn:w58kwehvHZroQGjT@sourdi.dymm7.mongodb.net/
const connection = mongoose.createConnection('mongodb://localhost:27017').on('open',() => {
    console.log('MongoDb Connected');
}).on('error',() => {
    console.log('MongoDb connection error')
})


module.exports =  connection;
