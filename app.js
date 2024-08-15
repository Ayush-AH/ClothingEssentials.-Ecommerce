const express = require("express")
const app = express()
const path = require("path")
const indexRouter = require("./routes/index-router")
const adminRouter = require("./routes/admin-router")
const collectionRouter = require("./routes/collection-router")
require("dotenv").config()
require("./config/mongoose-connection")
const session = require("express-session")
const flash = require("connect-flash")
const cookieParser = require("cookie-parser")

app.set("view engine","ejs")
app.use(express.static(path.join(__dirname ,"public")))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:process.env.EXPRESS_SESSION_SECRET
}))
app.use(flash())
app.use(cookieParser())

app.use("/",indexRouter)
app.use("/admin",adminRouter)
app.use("/collection", collectionRouter)


app.listen(4000)