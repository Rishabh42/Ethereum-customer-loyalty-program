var mongoose = require('mongoose');
var Schema = mongoose.Schema;


module.exports = mongoose.model('User', new Schema({ 
    name: String, 
    password: String, 
    admin: Boolean,
    uId: Number,
    bal: Number,
    cId: Number
}));