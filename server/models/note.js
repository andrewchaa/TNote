var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noteSchema = new Schema({
	title: String,
	content: String
});

module.exports = mongoose.model('Note', noteSchema);