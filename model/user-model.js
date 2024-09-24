const mongoose = require("mongoose")
const Joi = require("joi")

const cartSchema = mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    },
    quantity:{
        type:Number,
        default:1
    }
})

const userSchema = mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
    },
    role:{
        type:String,
        default:"user"
    },
    orders:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"product"
        }
    ],
    cart:[cartSchema],
})




const userModel = mongoose.model("user",userSchema)

module.exports.userModel = userModel