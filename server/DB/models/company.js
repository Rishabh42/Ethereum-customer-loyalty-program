var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = mongoose.model('Company', new Schema({ 
    name: String, 
    password: String,
    privateKey: String,
    accountKey: String
}));