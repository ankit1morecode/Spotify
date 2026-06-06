const ImageKit = require("@imagekit/nodejs");
require("dotenv").config();

const imagekitClient = new ImageKit({
    privateKey : process.env.IMAGE_KIT_PRIVATE_KEY
})

async function result(buffer){
    return await imagekitClient.files.upload({
        file : buffer,
        fileName : "music.mp3",
        folder : "spotify-backend/music"
    })
}

module.exports = {result};