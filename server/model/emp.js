const mongoose = require("mongoose")
const empSchema = new mongoose.Schema({
    registrationNo:{type:String},
    name:{type:String},
    email:{type:String},
    password:{type:String},
    phone:{type:Number},
    address:{type:String},
    specialization:{type:String},
    hospital:{type:String},
    emptype:{type:String,required:true},// doctor or labtech
    timetable:[{
            day:{type:String},
            timing:{type:String}
    }]
})

module.exports = mongoose.model('employee',empSchema);
