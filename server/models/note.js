var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noteSchema = new Schema({
	title: String,
	note: String
});

module.exports = mongoose.model('Note', noteSchema);