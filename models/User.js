var mongoose = require('mongoose');
var usersSchema = require('../schemas/user.js');

module.exports = mongoose.model('User',usersSchema);
