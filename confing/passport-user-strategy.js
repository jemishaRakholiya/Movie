const passport = require('passport');
const userregister = require('../models/userregister');
const passportlocal = require('passport-local').Strategy;
const e = require('express');


console.log('passport is running');

passport.use('user', new passportlocal({
    usernameField: 'email'
}, async (email, password, done) => {
    let userdata = await userregister.findOne({uemail: email});
    // console.log(email,password)
    if (userdata) {
        return done(null, userdata);
    }
    else {
        console.log('invalid details !!');
        return done(null, false);
    }
}))


passport.checkauth = (req,res,next) => {  
    // console.log("user") 
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/userlogin');
}

module.exports = passport;