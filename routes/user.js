const express = require("express")
const router = express.Router()
const {registerController,loginController ,logoutController} = require("../controllers/user-controller")

router.get("/register",(req,res)=>{
    res.render("register",{isLoggedIn:false})
})

router.get("/login",(req,res)=>{
    res.render("login",{isLoggedIn:false})
})

router.post("/register",registerController)
router.post("/login",loginController)
router.get("/logout",logoutController)

module.exports = router