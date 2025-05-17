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
    emptype:{type:String,default:"patient"},
    generateOTP:{type:String},
    expiresInOTP:{type:Date},
      //appointment//
    appointments:
    [
      {
        patientname: { type: String },
        gender:{type:String},
        dob:{type:Date},
        age:{type:Number},
        contact:{type:Number},
        appointmentdate:{type:Date,required:true},
        appointmentday:{type:String},
        appointmenttime:{type:String,required:true},
        doctorname:{type:String,required:true},
        reason:{type:String},
        symptoms:{type:String},
        appointmentcreatedate:{type:Date,default:Date.now},
        results:[{
          results:{type:String},
          visitDate:{type:Date,default: Date.now},
          condition:{type:String},
          remarks:{type:String},
          testrequired:{type:[String]}
        }],
        
        labreport:[{
          
        }]
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
