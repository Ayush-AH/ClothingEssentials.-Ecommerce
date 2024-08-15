const {productModel} = require("../model/products-model")

module.exports.adminController = async function(req,res){
    let products = await productModel.find()
    res.render("dashbord",{products})
}

module.exports.createProductController = async function(req,res){
    let {productName , price , discount, proCollection, category , availability} = req.body
    let productImage = req.file?.buffer
    if(!(productName && price && discount && proCollection && category && availability)) return res.send("empty field!!")
    if(!productImage) return res.send("No image found!!")

    let product = await productModel.create({
        productImage,
        mimetype:req.file.mimetype,
        productName,
        price,
        discount,
        proCollection,
        category,
        availability
    })
    req.flash("success","Product created succeddfully!")
    res.redirect("/admin/createproduct")
    
}