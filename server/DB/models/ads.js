var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = mongoose.model('Ads', new Schema({ 
    text: String, 
    price: Number,
    cId: String}));
