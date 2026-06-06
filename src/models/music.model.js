const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema({
    uri : {
        type : String
    },
    title : {
        type : String
    },
    artist : {
        type : String
    }
})

const musicModel = mongoose.model("music",musicSchema);


module.exports = musicModel;