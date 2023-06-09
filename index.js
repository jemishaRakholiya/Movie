const express = require('express');

const port = 8081;

const app = express();

const path = require('path');

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded());
app.use('/upload',express.static(path.join(__dirname+'/upload')));


const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportlocal = require('./confing/passport-local-strategy');
const pasportuser = require('./confing/passport-user-strategy');

app.use(express.static('assets'));

mongoose.connect('mongodb+srv://rakholiyajemisha13:1342003jemi@cluster0.rcmgfvi.mongodb.net/test',{
     useNewUrlParser : true, 
     useUnifiedTopology : true 
  }).then(()=>{ 
      console.log('DB Connect'); 
  }).catch(err =>{ 
      console.log('DB Not Connected !!',err); 
})

app.use(session({
    name : 'jemisha',
    secret : 'me',
    resave : true,
    saveUninitialized : false,
    cookie : {
        maxAge : 60*100*1000
    }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticationuser);

app.use('/',require('./route/index'));

app.listen(port,(err)=>{
    if(err)
    {
        console.log("server is not running");
    }
    console.log("server is running",port);
})
