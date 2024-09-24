const express = require("express")
const router = express.Router()
const {userModel} = require("../model/user-model")
const {addToCartController,removeFromCartController} = require("../controllers/cart-controller")
const {isLoggedIn} = require("../middlewear/isLoggedIn")

router.get("/",isLoggedIn,async function(req,res){
    let user = await userModel.findById(req.user.id).populate("cart.product")
    let totalPrice = 0
    user.cart.forEach(item => {
        totalPrice += item.product.price * item.quantity
    })
    let cartCount = user.cart.length
    res.render('addtocart',{user,totalPrice,cartCount} )
})

router.get("/add/:id", isLoggedIn,addToCartController)
router.get("/remove/:id", isLoggedIn,removeFromCartController)








module.exports = router