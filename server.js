var util = require('util');
var restify = require('restify');
var bunyan = require('bunyan');

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

function insertNote(db, note, next) {
  console.log('inserting ' + note);

  var collection = db.collection('notes');
  collection.insert(note, function (err, result) {
      if (err)
          console.log(err);

        console.log(result);
        next(result);
  });
}

function createNote(req, res, next) {
  if (!req.params.note) {
      next(new MissingNoteError());
      return;
  }

  console.log('opening ...');
  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect('mongodb://localhost:27017/note', function (err, db) {

  if (err)
      console.log(err);

    console.log('Connected to the server');

    var noteToSave = { title: req.params.title, note: req.params.note };
    insertNote(db, noteToSave, function(result) {
      res.send(201, result[0]._id);
      db.close();
      next();
    })


  })

}

var server = restify.createServer({
    name: 'tnote',
    version: '1.0.0'
});

server.pre(restify.pre.pause()); //don't drop data on uploads
server.pre(restify.pre.sanitizePath());
server.pre(restify.pre.userAgentConnection());
server.use(restify.requestLogger()); //bunyan logger
// server.use(restify.throttle({
//     burst: 10,
//     rate: 5,
//     ip: true
// }))

server.use(restify.acceptParser(server.acceptable));
server.use(restify.dateParser());
server.use(restify.authorizationParser());
server.use(restify.queryParser());
server.use(restify.gzipResponse());
server.use(restify.bodyParser());

server.get(/\//, restify.serveStatic({
    directory: './public',
    default: 'index.html'
}));

server.post('/note', createNote);

server.listen('8080', function () {
    console.log('%s listenting at %s', server.name, server.url);
});


