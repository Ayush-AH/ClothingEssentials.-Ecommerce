const express = require("express")
const router = express.Router()
const {createProductController , adminController ,adminLoginController,adminRegisterController,adminLogoutController} = require("../controllers/admin-controller")
const upload = require("../config/multer")
const {isAdminLoggedIn} = require("../middlewear/isAdminLoggedIn")




router.get("/",isAdminLoggedIn, adminController)
router.get("/login",function(req,res){
    res.render("adminLogin")
})

router.get("/register",adminRegisterController)
router.post("/login",adminLoginController)
router.get("/logout",adminLogoutController)

router.get("/createproduct",function(req,res){
    let success = req.flash("success")
    res.render("createProduct",{success})
})
router.get("/editproduct",function(req,res){
    res.render("editProduct")
})

router.post("/createproduct",upload.single("productImage") ,createProductController)
module.exports = router