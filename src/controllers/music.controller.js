const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");

const { result } = require("../services/storage.services");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function music(req, res) {
    let { title } = req.body;
    let file = req.file;
    let url = await result(file.buffer.toString("base64"));
    const musics = await musicModel.find();
    console.log(musics);
    let newMusic = await musicModel.create({
        uri: url.url,
        title: title,
        artist: req.user.id
    })
    res.status(200).json({
        message: "music created successfully",
        newMusic
    })
}

async function album(req, res) {
    let { title, musics } = req.body;
    let newAlbum = await albumModel.create({
        title: title,
        artist: req.user.id,
        musics: musics
    })
    res.status(201).json({
        message: "album created successfully",
        newAlbum
    })
}

async function getAllMusics(req, res) {
    const musics = await musicModel.find()
    .skip(0)
    .limit(3)
    .populate("artist", "username email");
    res.status(200).json({
        message: "music fetched successfully",
        musics
    })
}

async function getAllalbums(req, res) {
    const albums = await albumModel.find().select("title");

    res.status(200).json({
        message: "albums fetched successfully",
        albums
    })
}

async function getAlbum(req,res){
    let {albumId} = req.params;
    let album = await albumModel.findById(albumId).populate("artist").populate("musics");

    res.status(200).json({
        message : "album fetched successfully",
        album
    })
}

module.exports = { music, album, getAllMusics, getAllalbums ,getAlbum};