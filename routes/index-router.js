const express = require("express")
const router = express.Router()
const {productController} = require("../controllers/index-controller")
const {productModel} = require("../model/products-model")

router.get("/",async function(req,res){
    let products = await productModel.find({collection:"summer collection"})
    res.render('home' ,{products})
})
router.get("/cart",function(req,res){
    res.render('addtocart')
})
router.get("/product/:id",productController)

module.exports = router