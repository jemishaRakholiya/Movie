const mongosse = require('mongoose');

const cartschema = mongosse.Schema ({
    userid :{
        type : mongosse.Schema.Types.ObjectId,
        ref : 'userregister',
        require : true
    },
    email :{
        type : String ,
        require : true
    },
    name : {
        type: String,
        require : true
    },
    price : {
        type : String,
        require : true
    },
    time : {
        type : String,
        require : true
    },
    person :{
        type : String ,
        require : true
    },
    total :{
        type : String,
        require : true
    }
    

}) 

const cart = mongosse.model('cart',cartschema);
module.exports = cart;