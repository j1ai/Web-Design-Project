
var mongoose = require('mongoose');

// favourite course table structure
module.exports = new mongoose.Schema({
    username:String,
    course_id: String,
    course_code: String,
    course_name: String,
    course_desc: String,
})
