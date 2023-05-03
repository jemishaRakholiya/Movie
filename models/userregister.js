const mongoose = require('mongoose');

const registerschema = mongoose.Schema({
    uemail : {
        type : String,
        required : true
    },
    upassword : {
        type : String,
        required : true
    }
})

const userregister = mongoose.model('userregister', registerschema);
module.exports = userregister;