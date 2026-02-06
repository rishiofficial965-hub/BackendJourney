const mongoose = require("mongoose");

const userSchemma = new mongoose.Schema({
    name:{
        type:String,
        unique:[true,"with this user_name user already exists"]
    },
    email:{
        type:String,
        unique:[true,"with this email user already exists"]
    },
    password:String
})
const userModel = mongoose.model("users",userSchemma)

module.exports = userModel