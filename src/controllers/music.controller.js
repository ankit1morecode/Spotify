const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");

const { result } = require("../services/storage.services");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function music(req, res) {
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
}

async function album(req,res) {
        let {title,musics} = req.body;
        let newAlbum = await albumModel.create({
            title : title,
            artist : decoded.id,
            musics : musics
        })
        res.status(201).json({
            message:"album created successfully",
            newAlbum
        })
}

module.exports = { music,album };