const jwt = require("jsonwebtoken")

module.exports.isLoggedIn = function(req,res,next){
    if(req.cookies.token){
        jwt.verify(req.cookies.token,process.env.JWT_SECRET,function(err,decoded){
            if(err){
                res.redirect("/user/login")
            }else{
                req.user = decoded
                next()
            }
        })
    }else{
        res.redirect("/user/login")
    }
}