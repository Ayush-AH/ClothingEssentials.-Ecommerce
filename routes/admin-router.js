const express = require("express")
const router = express.Router()
const {createProductController , adminController} = require("../controllers/admin-controller")
const upload = require("../config/multer")


router.get("/",adminController)

router.get("/createproduct",function(req,res){
    let success = req.flash("success")
    res.render("createProduct",{success})
})
router.get("/editproduct",function(req,res){
    res.render("editProduct")
})

router.post("/createproduct",upload.single("productImage") ,createProductController)
module.exports = router