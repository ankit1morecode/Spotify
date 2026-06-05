const user = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

async function register(req, res){
    const{username,email,password,role="user"}=req.body;
    const ifUserExists=await user.findOne({
        $or: [
            {username}
            ,{email}
        ]
    });
    if(ifUserExists){
        return res.status(409).json({
            message: "user already Exists"
        })
    }
    const hash = await bcrypt.hash(password,10);
    let newUser = await user.create({ 
        username,
        email,
        password:hash,
        role 
    });
    let token = jwt.sign({
        id : newUser._id,
        role : newUser.role
    },process.env.JWT_SECRET);
    res.cookie("token",token);
    res.status(201).json({
        message: "user registered successfully",
        newUser
    })
}

async function login(req,res){
    let {username,email,password} = req.body;
    let newUser = await user.findOne({
        $or : [
            {username},
            {email}
        ]
    })
    if(!newUser){
        return res.status(409).json({
            message : "Invalid Credentials"
        })
    }
    const isValidPassword = await bcrypt.compare(password,newUser.password);
    if(!isValidPassword){
        return res.status(409).json({
            message : "Invalid Credentials"
        })
    }
    const token = jwt.sign({
        id : newUser._id,
        role : newUser.role
    },process.env.JWT_SECRET)
    res.cookie("token",token);
    res.status(200).json({
        message : "user loged in successfully",
        newUser
    })
}

module.exports = { register,login};