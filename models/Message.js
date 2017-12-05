var mongoose = require('mongoose');
var msgSchema = require('../schemas/msg.js');

module.exports = mongoose.model('msg_yinhaoti',msgSchema);
