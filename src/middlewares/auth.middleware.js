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
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({
            message : "Unauthorised"
        })
    }
}


module.exports = {authArtist};