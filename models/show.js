const mongosse = require('mongoose');

const showschema = mongosse.Schema ({
    showname :{
        type : mongosse.Schema.Types.ObjectId,
        ref : 'movie',
        require : true
    },
    time :{
        type : String ,
        require : true
    },
    address :{
        type : String ,
        require : true
    }

}) 

const show = mongosse.model('show',showschema);
module.exports = show;