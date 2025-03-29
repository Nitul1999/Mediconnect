const mongoose = require('mongoose')
require('dotenv').config();
mongoose.connect(process.env.MONGO_URL)

const connection = mongoose.connection;

connection.on('connected',()=>{
    console.log('Mongodb connected')
})

connection.on('error',(err)=>{
    console.log("Fail to Connect with Mongoose")
})

module.exports = connection;