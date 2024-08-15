const express = require("express")
const router = express.Router()
const {collectionController} = require("../controllers/collection-controller")

router.get("/:category",collectionController)

module.exports = router