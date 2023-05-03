const register = require('../models/register');
const movie = require('../models/moviemodel');
const userregister = require('../models/userregister');
const cart = require('../models/cart');
const show = require('../models/show');

module.exports.userregister = async (req,res) =>{
    return res.render('userregister');
}

module.exports.adduserregister = async(req,res) =>{
    // console.log(req.body);
    let admindata = await userregister.findOne({uemail : req.body.uemail});
    if(admindata){
        console.log('Invalaid detials');
        return res.redirect('back');
    }
    else{
        if(req.body.upassword == req.body.ucpassword){
            let addata = await userregister.create(req.body);
            return res.redirect('/userlogin');
        }
        else{
            console.log('Password Is Not Match !!');
            return res.redirect('back');
        }   
    }
}

module.exports.userlogin = async(req,res)=>{
    // return res.render('userlogin');
    // console.log(req.user);
    if(req.isAuthenticated()){
        return res.redirect('/');
     }
     return res.render('userlogin');
}

module.exports.bookingticket = async (req,res) =>{
    // console.log(req.params.id);
    let data = await show.findById(req.params.id).populate('showname').exec();
    return res.render('ticket',{
        'data' : data
    })
}

module.exports.cartdelete = async(req,res) =>{
    let cartdata = await cart.findByIdAndDelete(req.params.id);
    return res.redirect('back');
}

module.exports.addcart = async (req,res) =>{
    // console.log(req.user);
    // console.log(req.body);
    let userid = await req.user.id;
    let email = await req.user.uemail;
    let name = await req.body.name;
    let price = await req.body.price;
    let time = await req.body.time;
    let person = await req.body.person;
    let total = await req.body.total;
    let data = await cart.create({
        userid : req.user.id,
        email : req.user.uemail,
        name : req.body.name,
        price : req.body.price,
        time : req.body.time,
        person : req.body.person,
        total : req.body.total
    });
    return res.redirect('/')
}

module.exports.cart = async (req,res) =>{
    // console.log(locals.user);
    let userid = await req.params.id;
    let cartdata = await cart.find({'userid': userid});
    // console.log( cartdata);
    if(cartdata){
        // console.log(cartdata);
        return res.render('cartshow',{
            'data' : cartdata
        });
    }
    else
    {
        return res.redirect('/')
    }
}

module.exports.adduserlogin = async(req,res) =>{
    let moviedata = await show.find({}).populate('showname').exec();
    // console.log(moviedata);
    return res.render('frant',{
        'moviedata': moviedata
    })
}

module.exports.frant = async(req,res) =>{
    let moviedata = await show.find({}).populate('showname').exec();
    // console.log(moviedata);
    return res.render('frant',{
        'moviedata': moviedata
    })
}

module.exports.dash = async(req,res) =>{
    return res.render('dashbored');
}

module.exports.register = async(req,res) =>{
    if(req.isAuthenticated()){
        return next();
    }
    return res.render('register');
}

module.exports.addregistre = async (req,res) => {
    // console.log(req.body);
    let admindata = await register.findOne({email : req.body.email});
    if(admindata){
        console.log('Invalaid detials');
        return res.redirect('back');
    }
    else{
        if(req.body.password == req.body.cpassword){
            let addata = await register.create({
                email : req.body.email,
                password : req.body.password
            })
            return res.redirect('/login');
        }
        else{
            console.log('Password Is Not Match !!');
            return res.redirect('back');
        }
    }
}

module.exports.login = async(req,res) =>{
    if(req.isAuthenticated()){
       return res.render('dashbored');
    }
    return res.render('login');  
}

module.exports.addlogin = async(req,res) =>{
    return res.redirect('/dashboard');
}

module.exports.addmovie = async(req,res) =>{
    return res.render('addmovie');
}

module.exports.insertmovie = async(req,res) =>{
    // console.log(req.body);
    // console.log(req.file);
    req.body.isactive = 'true';
    var imagepath =' ';
    if(req.file){
        var imagepath = movie.imagepath+"/"+req.file.filename;
    }  
    req.body.image = imagepath;
    let moviedata = await movie.create(req.body);
    if(moviedata){
        console.log("Data is inserted");
        return res.redirect('back');
    }
    else
    {
        console.log("record is Not insert");
    }
}

module.exports.viewmovie = async(req,res) =>{
    // let moviedata = await movie.find(req.body);
    // return res.render('viewmovie',{
    //     'moviedata': moviedata
    // });

   
    let active = await movie.find({'isactive' : true});
    let deactive = await movie.find({'isactive' : false});
    // return res.render('viewmovie',{
    //         'active': active,
    //         'deactive' : deactive
    //     });
    let search = '';
    if(req.query.search){
        search = req.query.search;
    }

    let page = 1;
    if(req.query.page){
        page = req.query.page
    }
    var p_page = 1;

    let admindata = await movie.find({
        $or : [
            {name : {$regex : '.*'+search+'.*'}}
        ]
    })
    .skip((page -1) * p_page)
    .limit(p_page)
    .exec();

    let countdata = await movie.find({
        $or : [
            {name : {$regex : '.*'+search+'.*'}}
        ]
    }).countDocuments();

    return res.render('viewmovie',{
        'active' : active,
        'deactive' : deactive,
        'countrecored' : Math.ceil(countdata/p_page),
        'searchrecored' : search
    })
}

module.exports.deactive = async(req,res) =>{
    let moviedata = await movie.findByIdAndUpdate(req.params.id,{
        isactive : 'false'
    });
    return res.redirect('back');
}

module.exports.active = async(req,res) =>{
    let moviedata = await movie.findByIdAndUpdate(req.params.id,{
        isactive : 'true'
    });
    return res.redirect('back');
}


module.exports.movieprofile = async(req,res) =>{
    let moviedata = await movie.findById(req.params.id);
    return res.render('movieprofile',{
        moviedata : moviedata
    });
}

module.exports.updateprofile = async(req,res) =>{
    let moviedata = await movie.findById(req.body.editmovie);
    if(moviedata){
        let movieedit = await movie.findByIdAndUpdate(req.body.editmovie,req.body);
        if(movieedit){
            return res.redirect('/viewmovie');
        }
        return res.redirect('back');
    }
    return res.redirect('back');
}

module.exports.changepassword = async(req,res) =>{
    return res.render('changepassword');   
}

module.exports.editpassword = async (req,res) => {
    console.log("Change password")
    console.log(req.user);
    var oldpass = req.user.password;
    var opass = req.body.opass;
    var npass = req.body.npass;
    var copass = req.body.copass;
    if(oldpass == opass){
        if(opass != npass){
            if(npass == copass){
                let moviedata = await register.findByIdAndUpdate(req.user.id, {password : npass});
                return res.redirect('/logout');
            }
            else{
                console.log("New & Confirm Are Not Match !!");
                return res.redirect('back');
            }
        }
        else{
            console.log("Old Password & New Are Match !!");
            return res.redirect('back');
        }
    }
    else{
        console.log("Old Password Not Match !!");
        return res.redirect('back');
    }
}