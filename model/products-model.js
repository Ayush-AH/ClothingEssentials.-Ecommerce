const { required } = require("joi");
const mongoose = require("mongoose");


const productSchema = mongoose.Schema({
    productImage:{
        type:Buffer,
        required:true
    },
    mimetype:{
        type:String,
        required:true
    },
    productName:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        required:true
    },
    proCollection: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    availability:{
        type:Boolean,
        required:true,
    }
})

const validateProduct = (data)=>{
    const productValidationSchema = Joi.object({
        productImage: Joi.binary()
            .required()
            .messages({
                'any.required': 'Product image is required.',
                'binary.base': 'Product image must be a valid binary format.'
            }),
        productName: Joi.string()
            .required()
            .messages({
                'any.required': 'Product name is required.',
                'string.base': 'Product name must be a string.'
            }),
        price: Joi.number()
            .required()
            .messages({
                'any.required': 'Price is required.',
                'number.base': 'Price must be a number.'
            }),
        discount: Joi.number()
            .default(0)
            .messages({
                'number.base': 'Discount must be a number.'
            }),
        collection: Joi.string()
            .required()
            .messages({
                'any.required': 'Collection is required.',
                'string.base': 'Collection must be a string.'
            }),
        category: Joi.string()
            .required()
            .messages({
                'any.required': 'Category is required.',
                'string.base': 'Category must be a string.'
            }),
        productType: Joi.string()
            .required()
            .messages({
                'any.required': 'Product type is required.',
                'string.base': 'Product type must be a string.'
            }),
        availability: Joi.boolean()
            .required()
            .default(true)
            .messages({
                'any.required': 'Availability is required.',
                'boolean.base': 'Availability must be a boolean.'
            })
    });
    var {error} =  productValidationSchema.validate(data)
    return error
}

const productModel = mongoose.model("product",productSchema)

module.exports.productModel = productModel
module.exports.validateProduct = validateProduct
