const jwt = require("jsonwebtoken");
require("dotenv").config();

async function authArtist(req,res,next){
    let token = req.cookies.token;
    if(!token){                        
        return res.status(401).json({
            message: "Unauthorised"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded.role!="artist"){
            return res.status(403).json({
                message:"Access denied"
            })
        }
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({
            message : "Unauthorised"
        })
    }
}

async function authUser(req,res,next){
    let token = req.cookies.token;
    if(!token){
        return res.status(403).json({
            message : "Unauthorised"
        })
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(decoded.role!=="user"){
            return res.status(409).json({
                message : "you dont have access"
            })
        }
        req.user = decoded;
        next();
    } catch (err){
        console.log(err);
        res.status(403).json({
            message : "Unauthorised"
        })
    }
}


module.exports = {authArtist,authUser};