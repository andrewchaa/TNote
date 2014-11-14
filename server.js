var bodyParser = require('body-parser');
var express = require('express');
var app = express();

var port = process.env.PORT || 8080
var router = express.Router();

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

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use('/api', router);
app.use('/', express.static('./public'));

router.get('/', function (req, res) {
	res.redirect('/index.html');
});

router.post('/note', function (req, res) {
	console.log(req.body.note);

  if (!req.body.note) {
      res.status(400).send({ 'error' : 'note is expected'});
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
      res.status(201).send({ 'noteId' : result[0]._id });
      db.close();
    })


  })

});

app.listen(port);

