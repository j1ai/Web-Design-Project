var mongoose = require('mongoose');
var markerSchema = require('../schemas/map.js');

module.exports = mongoose.model('Map',markerSchema);
