var express = require('express');
var app = express();


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

app.use('/', express.static('./public'));
app.get('/', function (req, res) {
	res.redirect('/index.html');
});

app.post('/note', function (req, res) {

  if (!req.params['note']) {
  	  console.log(req.params);
  	  console.log(req);
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
      res.send(201, result[0]._id);
      db.close();
    })


  })

});

app.listen(8080);

