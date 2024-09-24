const express = require("express")
const router = express.Router()
const {productController} = require("../controllers/index-controller")
const {productModel} = require("../model/products-model")
const {userModel} = require("../model/user-model")

router.get("/",async function(req,res){
    let products = await productModel.find({proCollection:"summer collection"})
    let userKey = req.session.user
    let cartCount = null
    if(userKey){
        var user = await userModel.findOne({email:userKey.email})
        if(user){
            cartCount = user.cart.length
        }
    }
    res.render("home",{products,cartCount})
})

router.get("/contact-us",function(req,res){
    res.render("contact")
})

router.get("/product/:id",productController)

module.exports = router