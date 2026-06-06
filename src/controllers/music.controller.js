const musicModel = require("../models/music.model");
const { result } = require("../services/storage.services");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function music(req, res) {
    let token = req.cookies.token;
    if (!token) {                            //check for token is there or not
        return res.status(401).json({
            message: "Unauthorised"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);           //for veryfying token is correct or not
        if(decoded.role!="artist"){
            return res.status(403).json({
                message:"Access denied. Only artists can perform this action."
            })
        }
        let { title } = req.body;
        let file = req.file;
        let url = await result(file.buffer.toString("base64"));
        let newMusic = await musicModel.create({
            uri: url.url,
            title: title,
            artist: decoded.id
        })

        res.status(200).json({
            message: "music created successfully",
            newMusic
        })

    } catch (err) {
        console.log(err);
        res.status(403).json({
            message: "user dont have access to create music",
        })
    }
}

module.exports = { music };