const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const employee = require('../model/emp');
const { default: mongoose } = require("mongoose");
const emp = require("../model/emp");
const router = express.Router()

//employee login by email or phone or reg no ...working
router.post("/login", async (req, res) => {
    try {
        let empExits;
        if(req.body.email){
            empExits = await employee.findOne(
                {
                    email:req.body.email
                }
            );
        }else if(req.body.phone){
            empExits = await employee.findOne(
                {
                    phone:req.body.phone
                }
            );
        }else if(req.body.registrationNo){
            empExits = await employee.findOne(
                {
                    registrationNo:req.body.registrationNo
                }
            );
        }else{
            return res.status(400).json({message:"Provide vaild Email, Phone No or Registration No"})
        }
        if (!empExits) {
            return res.status(400).json({ message: "Account does not exist", success: false });
        }

        const validedPassword = await bcrypt.compare(req.body.password,empExits.password);
        if (!validedPassword) {
            return res.status(400).json({ message: "Invalid Password", success: false });
        }
        const token = jwt.sign(
            { userid: empExits._id, role: empExits.emptype  },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.json({
            message: "Login Successful",
            success: true,
            data: token
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
//forget password
router.post('/forget-password',async(req,res)=>{
    console.log(req.body)
    try {
        const {email,password} = req.body
        const empExist = await employee.findOne({email});

         if (!empExist) {
            return res.status(400).send({ message: "Email does not exist", success: false });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await employee.updateOne({email},{$set:{password:hashedPassword}})
        res.send({message:"Password updated successfully",success:true})
        
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Internal Server Error", success: false });
        
    }
})
//get profile 
router.get("/profile/view/:id", async (req, res) => {
    const {id:_id} = req.params
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(201).json({message:"Invaild ID"})
    }
    try {
        const user = await employee.findById({_id});
        res.status(200).send({
            message:"User Found",
            success:true,
            data: user});
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
})

//Update Profile by Emp Id ...working
router.patch('/profile/update/:id',async(req,res)=>{ //used patch becaused modify specific parts of the profile data
    try {
        const {id:_id} = req.params
        const updatedata = req.body
        if(!mongoose.Types.ObjectId.isValid(_id)){
            return res.status(400).json({
                message:"Profile Not Found",
                success:true,

            })
        }
        const updateemployee = await employee.findByIdAndUpdate(_id,updatedata,{new:true})
        res.status(200).json({
            message:"Profile Update Succssfully",
            success:true,
            data:updateemployee})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
})

//only doctors view
router.get("/all/doctor",async(req,res)=>{
    try {
        const data = await employee.find({emptype:'doctor'})
        if(!data){
            res.status(200).send({message:'Doctor not available',success:false})
        }
        res.status(200).json({message:"All Doctors", success:true,data:data});
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})       
    }
})

module.exports = router;