const express = require("express")
const router = express.Router()
const passport = require("passport")

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
    passport.authenticate('google', {session:false, failureRedirect: '/' }),
    (req, res) => {
        let {token} = req.user
        res.cookie("token",token)
        res.redirect('/');
    }
);

module.exports = router