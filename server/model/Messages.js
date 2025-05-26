const mongoose = require('mongoose')

const messageschema = new mongoose.Schema({
      name:{type:String},
      email:{type:String},
      contact:{type:String},
      message:{type:String},
      date:{type:Date,default:Date.now}
},{timestamps:true})
module.exports = mongoose.model('Message',messageschema);