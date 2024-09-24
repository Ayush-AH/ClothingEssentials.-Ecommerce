const {productModel} = require("../model/products-model")
const {userModel} = require("../model/user-model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

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

module.exports.adminRegisterController = async function(req,res){
let user = await userModel.findOne({email:"ayushahirwar81@gmail.com"})
if(user) return res.send("user already exists")
 bcrypt.genSalt(10,function(err,salt){
    bcrypt.hash("ayush",salt,async function(err,hash){
       user = await userModel.create({fullName:"ayush",email:"ayushahirwar81@gmail.com",password:hash,role:"admin"})
       let token = jwt.sign({email:"ayushahirwar81@gmail.com",id:user._id},process.env.JWT_SECRET)
       res.cookie("adminToken",token)
       res.redirect("/admin")
    })
 })
    
}


module.exports.adminLoginController = async function(req,res){
    let {email,password} = req.body
    if(!(email || password)) return res.send("Please fill all the fields")

    let user = await userModel.findOne({email})
    if(!user) return res.send("User not found")

    bcrypt.compare(password,user.password,async function(err,result){
        if(err) return res.send("Invalid password")
        let token = jwt.sign({email:"ayushahirwar81@gmail.com",id:user._id},process.env.JWT_SECRET)
        res.cookie("adminToken",token)
        res.redirect("/admin")
    })
}


module.exports.adminLogoutController = function(req,res){
    res.clearCookie("adminToken")
    res.redirect("/admin/login")
}
