const express = require('express');

const route = express.Router();

const controller = require('../controller/index');

const movie = require('../models/moviemodel');

const passport = require('passport');

//ticket

route.get('/',controller.frant);
route.get('/dashboard', passport.checkauthentication, controller.dash);

//login
route.get('/login',controller.login);
route.post('/addlogin',passport.authenticate('local',{failureRedirect : '/login'}),controller.addlogin);

//register
route.get('/register',controller.register);
route.post('/addregistre',controller.addregistre);

//addmovie
route.get('/addmovie',passport.checkauthentication,controller.addmovie);
route.post('/insertmovie',passport.checkauthentication,movie.uploadimage,controller.insertmovie);
route.get('/viewmovie',passport.checkauthentication,controller.viewmovie);

//active-deactive
route.get('/deactive/:id',controller.deactive);
route.get('/active/:id',controller.active);

//profileview
route.get('/movieprofile/:id',controller.movieprofile);
route.post('/updateprofile',controller.updateprofile);

// change password
route.get('/changepassword', passport.checkauthentication, controller.changepassword);
route.post('/editpassword', passport.checkauthentication, controller.editpassword);

route.get('/logout',async(req,res,next)=> {
    req.logOut(function(err){
        if(err)
        {
            return next(err);
        }
        return res.redirect('/login');
    })
});

//user register
route.get('/userregister', controller.userregister);
route.post('/adduserregister', controller.adduserregister);

//userlogin
route.get('/userlogin', controller.userlogin);
route.post('/adduserlogin', passport.authenticate('user',{failureRedirect : '/userlogin'}), controller.adduserlogin);
route.get('/usersignout',async(req,res,next)=> {
    req.logOut(function(err){
        if(err)
        {
            return next(err);
        }
        return res.redirect('/userlogin');
    })
})

//bookingticket
route.get('/bookingticket/:id',passport.checkauth,controller.bookingticket);
route.post('/addcart',passport.checkauth,controller.addcart);
route.get('/cart/:id',controller.cart);
route.get('/cartdelete/:id',controller.cartdelete);

route.use('/show',require('./show'));
module.exports = route;
