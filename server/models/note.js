var data = { id: 1, title: 'title', content: 'content'};
var azure = require('azure-storage');
var config = require('../../config');

if (!process.env.AZURE_STORAGE_ACCOUNT) {
  process.env.AZURE_STORAGE_ACCOUNT = config.azure.AZURE_STORAGE_ACCOUNT;
}

if (!process.env.AZURE_STORAGE_ACCESS_KEY) {
  process.env.AZURE_STORAGE_ACCESS_KEY = config.azure.AZURE_STORAGE_ACCESS_KEY;
}


function Note() {
	this.title = '';
	this.content = '';
}	

Note.prototype.save = function (next) {
	console.log('Saving the note, title: ' + title + ', content: ' + content);
	next();
};

Note.find = function (next) {
	console.log('Finding all notes');
	next(null, [
		data
	]);
};

Note.findById = function (id, next) {
	next(null, data)
}

module.exports = Note;