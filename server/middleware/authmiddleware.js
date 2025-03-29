const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    try {

        const token = req.headers.authorization.split(" ")[1];
        const decodedtoken = jwt.verify(token,process.env.JWT_SECRET);
        const userId = decodedtoken.userid;
        req.body.userId= userId;
        next()
        
    } catch (error) {
        res.status(401).send({
            message:"You are not Authenticated",
            data: error,
            success:false
        })
    }
}

