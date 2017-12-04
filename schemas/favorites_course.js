
var mongoose = require('mongoose');

// User table structure
module.exports = new mongoose.Schema({
    username:String,
    course_code: String,
    course_name: String,
    course_desc: String,
})
