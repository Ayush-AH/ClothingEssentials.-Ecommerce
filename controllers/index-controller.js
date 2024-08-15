const {productModel} = require("../model/products-model")

module.exports.productController = async function(req,res){
    let product = await productModel.findOne({_id:req.params.id})
    res.render('product',{product})
}