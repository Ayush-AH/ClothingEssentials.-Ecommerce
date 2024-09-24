const {productModel} = require("../model/products-model")
const {userModel} = require("../model/user-model")

module.exports.productController = async function(req,res){
    let product = await productModel.findOne({_id:req.params.id})
    let userKey = req.session.user
    let cartCount = null
    if(userKey){
        var user = await userModel.findOne({email:userKey.email})
        if(user){
            cartCount = user.cart.length
        }
    }

    res.render('product',{product,cartCount})
}