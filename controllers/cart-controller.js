const {productModel} = require("../model/products-model")
const {userModel} = require("../model/user-model")

module.exports.addToCartController = async function(req,res){
    let product = await productModel.findById(req.params.id)
    console.log(req.user);
    let user = await userModel.findById(req.user.id)
    console.log(user);
    if(user.cart.length > 0){
        let cartItem = user.cart.find(item => item.product.toString() === product._id.toString())
        if(cartItem){
            cartItem.quantity += 1
        }else{
            user.cart.push({product:product,quantity:1})
        }
    }else{
        user.cart.push({product:product,quantity:1})
    }
    await user.save()   
    res.redirect("/cart")
}

module.exports.removeFromCartController = async function(req,res){
    let product = await productModel.findById(req.params.id)
    let user = await userModel.findById(req.user.id)
    let cartItem = user.cart.find(item => item.product.toString() === product._id.toString())
    if(cartItem){
        cartItem.quantity -= 1
        if(cartItem.quantity == 0){
            user.cart = user.cart.filter(item => item.product.toString() !== product._id.toString())
        }
    }
    await user.save()
    res.redirect("/cart")
}
