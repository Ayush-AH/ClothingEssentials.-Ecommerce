const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {userModel} = require("../model/user-model")

module.exports.registerController = async function(req,res){
    let {fullName,email,password} = req.body
    if(!(fullName || email || password)) return res.send("Please fill all the fields")

   var user = await userModel.findOne({email}) 
   if(user) return res.send("User already exists")
   
 bcrypt.genSalt(10,function(err,salt){
    bcrypt.hash(password,salt,async function(err,hash){
       user = await userModel.create({fullName,email,password:hash})
       let token = jwt.sign({email,id:user._id},process.env.JWT_SECRET)
       req.session.user = user
       res.cookie("token",token)
       res.redirect("/")
    })
 })
    
}
module.exports.loginController = async function(req,res){
    let {email,password} = req.body
    if(!(email || password)) return res.send("Please fill all the fields")

    let user = await userModel.findOne({email})
    if(!user) return res.send("User not found")

    bcrypt.compare(password,user.password,async function(err,result){
        if(err) return res.send("Invalid password")
        let token = jwt.sign({email,id:user._id},process.env.JWT_SECRET)
        req.session.user = user
        res.cookie("token",token)
        res.redirect("/")
    })
}

module.exports.logoutController = function(req,res){
    req.session.destroy()   
    res.clearCookie("token")
    res.redirect("/")
}
