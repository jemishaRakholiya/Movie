const passport = require('passport');
const register = require('../models/register');
const e = require('express');
const userregister = require('../models/userregister');
const passportlocal = require('passport-local').Strategy;

console.log('passport ia running');

passport.use(new passportlocal({
    usernameField : 'email'
}, async (email,password,done)=> {
    let moviedata = await register.findOne({email : email});
    if(moviedata && moviedata.password == password){
        return done(null,moviedata);
    }
    else{
        console.log('invalid details !!');
        return done(null,false);
    }
}))

passport.serializeUser(async (user,done)=> {
    return done(null,user.id);
})

passport.deserializeUser(async (id,done) => {
    let moviedata = await register.findById(id);
    if(!moviedata){
        let userdata = await userregister.findById(id);
        return done(null,userdata);
    }
    else{
        // console.log('data match !!');
        return done(null,moviedata);
    }
})

passport.checkauthentication = (req,res,next) => {   
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/login');
}

passport.setAuthenticationuser = (req,res,next) => {
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    return next();
}

module.exports = passport;