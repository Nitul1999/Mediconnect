const express = require("express");
const router = express.Router()
const Messageschema = require('../model/Messages')

router.post('/post-message',async(req,res)=>{
    try {
        const message =req.body
        const submitmessage = new Messageschema(message)
        await submitmessage.save()
        res.status(201).json({ message: "Message Send, Thank you for your Message, i will try to connect you soon",success:true });
    } catch (error) {
        res.status(500).json({message:"Server Error"})
    }
})

router.get('/view/all/message',async(req,res)=>{
    try {
        const message = await Messageschema.find().sort({ createdAt: -1 })
        if(message.length===0){
            return res.status(404).json({message:"No message Found!!",success:false})
        }
        res.status(200).json({data:message})
    } catch (error) {
        res.status(500).json({message:"server error!! please try again later"})
    }
})

module.exports = router;