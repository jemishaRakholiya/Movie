const movie = require('../models/moviemodel');
const show = require('../models/show');


module.exports.addshow = async (req,res) =>{
    let moviedata = await movie.find(req.body);
    return res.render('addshow',{
        'moviedata' : moviedata
    });
}

module.exports.insertshow = async (req,res) => {
    let showdata = await show.create(req.body);
    return res.redirect('back');
}

module.exports.viewshow = async(req,res) =>{
    let showdata = await show.find(req.body).populate('showname').exec();
    return res.render('viewshow',{
        'showdata' : showdata
    });
}

module.exports.delete = async(req,res) => {
    let showdata = await show.findByIdAndDelete(req.params.id);
    return res.redirect('/viewshow');
}

module.exports.update = async(req,res) =>{
    let showdata = await show.findById(req.params.id).populate('showname').exec();
    return res.render('updateshow',{
        'showdata' : showdata
    })
}