
var mongoose = require('mongoose');

// User table structure
module.exports = new mongoose.Schema({
    creat_data:String,
    message:String,
   	reason:String
})
