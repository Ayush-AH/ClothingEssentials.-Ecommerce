const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require("jsonwebtoken")
const {userModel} = require("../model/user-model")

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
},
    async function (accessToken, refreshToken, profile, done) {
        var email = profile.emails[0].value
        var user = await userModel.findOne({email})
        if(!user){
            user =  await userModel.create({
                username:profile.displayName,
                email,
                role:"user"
            })
        }
        let token = jwt.sign({email,id: user._id},process.env.JWT_SECRET)

        return done(null, {token });
    }));


module.exports = passport