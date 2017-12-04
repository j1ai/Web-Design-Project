var mongoose = require('mongoose');
var favoriteCourseSchema = require('../schemas/favorites_course.js');

module.exports = mongoose.model('FavoriteCourse',favoriteCourseSchema);
