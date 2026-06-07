const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema({
    uri : {
        type : String
    },
    title : {
        type : String
    },
    artist : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    }
})

const musicModel = mongoose.model("music",musicSchema);


module.exports = musicModel;