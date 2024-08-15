const mongoose = require("mongoose")
const Joi = require("joi")

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
        required:true,
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
    cart:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"product"
        }
    ],
})



const validateUser = (data)=>{
    const userValidationSchema = Joi.object({
        fullName: Joi.string()
            .trim()
            .required(),
    
        email: Joi.string()
            .trim()
            .email({ tlds: { allow: false } })
            .required(),
    
        password: Joi.string()
            .required(),
    
        role: Joi.string()
            .default('user'),
    
        orders: Joi.array()
            .items(Joi.string()),
    
        cart: Joi.array()
            .items(Joi.string())
    });

    var {error} = userValidationSchema.validate(data)
    console.log(error);
    
}

const userModel = mongoose.model("user",userSchema)

module.exports.userModel = userModel
module.exports.validateUser = validateUser