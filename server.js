var util = require('util');
var restify = require('restify');
var bunyan = require('bunyan');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/note');

function MissingNoteError() {
	restify.RestError.call(this, {
		statusCode: 409,
		restCode: "MissingNote",
		message: '"note" is a required parameter',
		constructorOpt: MissingNoteError
	});

	this.name = 'MissingNoteError';
}
util.inherits(MissingNoteError, restify.RestError);

function createNote(req, res, next) {
	if (!req.params.note) {
		req.log.warn({params: p}, 'createNote: missing note');
		next(new MissingNoteError());
		return;
	}

	console.log('title: ' + req.params.title);
	console.log('note: ' + req.params.note);

	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {

		var noteSchema = mongoose.Schema({
			title: String,
			note: String
		});

		var Note = mongoose.model('Note', noteSchema);
		var noteToSave = new Note({ title: req.params.title, note: req.params.note });
		console.log('Note is ' + noteToSave);

		noteToSave.save(function (err, newNote) {
			if (err) 
				return console.log('An error happened while saving: ' + err);
		})

	});


	res.send(201, noteToSave);
	next();
}

var server = restify.createServer({
	name: 'tnote',
	version: '1.0.0'
});

server.pre(restify.pre.pause()); //don't drop data on uploads
server.pre(restify.pre.sanitizePath());
server.pre(restify.pre.userAgentConnection());
server.use(restify.requestLogger()); //bunyan logger
server.use(restify.throttle({
	burst: 10,
	rate: 5,
	ip: true
}))

server.use(restify.acceptParser(server.acceptable));
server.use(restify.dateParser());
server.use(restify.authorizationParser());
server.use(restify.queryParser());
server.use(restify.gzipResponse());
server.use(restify.bodyParser());

server.post('/note', createNote);

server.listen('8080', function () {
	console.log('%s listenting at %s', server.name, server.url);
});


