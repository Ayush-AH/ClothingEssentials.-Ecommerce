const jwt = require("jsonwebtoken")

module.exports.isAdminLoggedIn = function(req,res,next){
    let token = req.cookies.adminToken
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,function(err ,decoded){
            if(err){
                res.redirect("/admin/login")
            }else{
                req.user = decoded
                next()
            }
        })
    }else{
        res.redirect("/admin/login")
    }
}
