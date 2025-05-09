const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const person = require('../model/person')
const { default: mongoose, Mongoose } = require("mongoose");
const router = express.Router()

//create register/account
router.post('/register',async(req,res)=>{
    console.log(req.body)
    try {
        const personData = req.body
        const existingemail = await person.findOne({email:personData.email})
        if(existingemail){
            // console.log("email exists")
            return res.status(409).json({message:"Email Already exists!! Please provide valid email..."})
        }
        if (personData.password !== personData.confirmPassword) {
             return res.status(400).json({message:'Passwords do not match'});
        }
        const hashedpassword = await bcrypt.hash(personData.password,10)
        const register = new person ({
            name:personData.name,
            email: personData.email,
            gender:personData.gender,
            dateofbirth:personData.dateofbirth,
            password:hashedpassword
        })
        await register.save()
        res.status(201).json({
            message:"Account Created Succssfully..",
            success:true
        })
    } catch (error) {
        res.status(500).json(error)
    }

})
//create login
router.post('/login',async(req,res)=>{
   
    try {
        const {email,password}= req.body
        const user = await person.findOne({email})
        if(!user){
            return res.status(400).send({message:"Account Not Found!! Please Create Account First..",success:false})
        }
         if (!email || !password) {
            return res.status(400).send({ message: "Email and Password are required", success: false });
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).send({message:"Invaild Password..",success:false})
        }
        const token = jwt.sign(
            {
                userid:user._id,
                role: user.emptype
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )     
        res.json({
            message:"Login Successfull",
            success:true,
            data:token
        })
    } catch (error) {
        res.status(500).json(error)       
    }
})
//fetch loggin user profile 
router.get('/person/:id', async (req, res) => {

    const { id:_id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).json({message:"No user found with that ID",success:false})
    }
    try {
       
        const data = await person.findById(_id);

        if (!data) {
            return res.status(404).json({ error: 'Person not found' });
        }

        res.status(200).json(data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
});
//create appointment
router.put('/create/appointment/:id',async(req,res)=>{
    try {
        const userid = req.params.id
        
        const appointmentdata = req.body
        console.log(appointmentdata)
        if(!appointmentdata){
            return res.status(500).json({message:"Invaild Operation",success:false})
        }
        const createapppointment ={
            ...appointmentdata,
            createAt:new Date(),
        }
        const updateappointment = await person.findByIdAndUpdate(
            userid,{$push:{appointments:createapppointment}},
            {new:true, runValidators:true}
        )
        if(!updateappointment){
            return res.status(404).json({message:"User Not Found", success:false})
        }
       return res.status(200).json({message:"Appointment Created Successfully", success:true})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Server Error"})
    }
})
//view appointments by user 
router.get('/view-all/appointment/:id',async(req,res)=>{
       const {id:_id} = req.params
       if(!mongoose.Types.ObjectId.isValid(_id)){
            return res.status(404).json({message:"No user found with that ID",success:false})
       }
       try {
        const data = await person.findById(_id)
        if(!data){
            return res.status(404).json({message:"User Not Found",success:false})
        }
        res.status(200).json({appointments:data.appointments, success:true,message:"All Appointments Found"})
       } catch (error) {
        console.error("Error fetching appointments:", error);
        return res.status(500).json({ message: "Server error", success: false });
       }
})

//delete a appointment
router.patch('/appointmnet/:userid/delete/:appointmentid',async(req,res)=>{
    const {userid,appointmentid} = req.params
    if(!mongoose.Types.ObjectId.isValid(userid)){
        return res.status(404).json({message:"User Not Foud found ",success:false})
    }
    if(!mongoose.Types.ObjectId.isValid(appointmentid)){
        return res.status(404).json({message:"Appointment Not Found",success:false})
    }
    try {
        const deleteappointment = await person.findByIdAndUpdate(
            userid,{$pull:{appointments:{_id:appointmentid}}},
            {new:true,runValidators:true}
            )
            if(!deleteappointment){
                return res.status(404).json({message:"User Not Found",success:false})
            }
        return res.status(200).json({message:"Appointment Deleted Successfully",success:true})
    } catch (error) {
        
    }
        

})

//update appointment details 
router.patch('/appointment/:userid/update-appointment-details/:appointmentid',async(req,res)=>{

    const {userid,appointmentid} = req.params
    const data = req.body
    if(!mongoose.Types.ObjectId.isValid(userid)){
        return res.status(404).json({message:"Unable to find user",success:false})
    }
    if(!mongoose.Types.ObjectId.isValid(appointmentid)){
        return res.status(404).json({message:"Appointment Not Found",success:false})
    }
    try {
        
    } catch (error) {
        const updateappointment = await person.findByIdAndUpdate(
            userid,{$set:{appointments:{$elemMatch:{_id:appointmentid,appointment:data.appointment}}}}, {new:true,runValidators:true}
        
        )
    }
    
})

module.exports = router;