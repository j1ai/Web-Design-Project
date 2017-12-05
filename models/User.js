var mongoose = require('mongoose');
var usersSchema = require('../schemas/user.js');

module.exports = mongoose.model('user_yinhaoti',usersSchema);
