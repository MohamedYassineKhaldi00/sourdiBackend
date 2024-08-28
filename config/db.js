const mongoose = require('mongoose');


const connection = mongoose.createConnection(' mongodb+srv://sourditn:w58kwehvHZroQGjT@sourdi.dymm7.mongodb.net/?retryWrites=true&w=majority&appName=sourdi').on('open',() => {
    console.log('MongoDb Connected');
}).on('error',() => {
    console.log('MongoDb connection error')
})


module.exports =  connection;
