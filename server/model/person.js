const mongoose = require('mongoose')
const schema = mongoose.Schema
const personschema = new mongoose.Schema({
    name:{type:String,require:true},
    password:{type:String,require:true},
    dateofbirth:{type:String,require:true},
    gender:{type:String,enum:['Male','Female','Other']},
    phone:{type:Number,require:true},
    email:{type:String,require:true},
    fathername:{type:String},
    mothername:{type:String},
    street:{type:String},
    city:{type:String },
    state:{type:String },
    postalCode:{type:String },
    country:{type:String},
      //appointment//
    appointments:
    [
      {
      appointmentdate:{type:Date,required:true},
      appointmenttime:{type:String,required:true},
      doctorname:{type:String,required:true},
      queueNumber:{type:Number,required:true},
      doctorSpecialty:{type:String},
      symptoms:{type:String}
      },
    ],
      //medical history//
    medicalhistory:[{
      visitDate:{type:Date},
      prescription:{type:String}, 
      doctorName:{type:String},
      diagnosis:{type:String},
     }],
    labReports: [
        {
          testName:{type:String},
          testResult:{type:String},
          date:{type:Date},
          labTechnicianName:{type:String,required:true},
          refereddoctorname:{type:String,required:true},
          unit:{type:String}, 
          resultStatus:{type:String,enum:["Normal","Abnormal","Critical"]},
          notes: { type: String },  
        },
      ],
},{timestamps:true})

module.exports = mongoose.model('Person',personschema);
