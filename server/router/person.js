const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const person = require('../model/person')
const { default: mongoose } = require("mongoose");
const router = express.Router()


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

router.post('/login',async(req,res)=>{
    console.log(req.body)
    try {
        const {email,password}= req.body
        const person = await person.findOne({email})
         if (!email || !password) {
            return res.status(400).send({ message: "Email and Password are required", success: false });
        }
        const isMatch = await bcrypt.compare(password, person.password)
        if(!isMatch){
            return res.status(400).send({message:"Invaild Password..",success:false})
        }
        const token = jwt.sign(
            {
                userid:person._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )
        res.send({
            message:"Login Successfull",
            success:true,
            data:token
        })
    } catch (error) {
        res.status(500).json(error)       
    }
})

module.exports = router;