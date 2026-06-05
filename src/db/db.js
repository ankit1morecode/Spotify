const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("databse connected successfully");
    }catch(err){
        console.log(`error in connecting DB ERROR : ${err}`);
    }
}

module.exports = connectDB;