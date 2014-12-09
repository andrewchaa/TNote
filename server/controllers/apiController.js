(function (controller) {

  var Note = require('../models/note');

  controller.init = function (router) {

    router.use(function (req, res, next) {
      console.log('logging route...');
      next();
    });

    router.get('/', function (req, res) {
      res.redirect('/index.html');
    });

    router.route('/notes')
      .post(function (req, res) {

        var note = new Note();
        note.title = req.body.title;
        note.note = req.body.note;

        note.save(function (err) {
          if (err)
            res.status(400).send(err);

          var host = req.protocol + '://' + req.get('host');
          res.status(201).json({ 
            note : { 
              message : 'Note created',
              links : [
                { link : host + '/api/notes/' + note.id, rel : 'self' },
                { link : host + '/api/notes/' + note.id, rel : 'update' },
                { link : host + '/api/notes/' + note.id, rel : 'delete' },
                { link : host + '/api/notes/', rel : 'list' }
              ]
            }
          });
        });

      })

      .get(function (req, res) {
        Note.find(function (err, notes) {
          if (err) 
            res.status(400).send(err);

          var host = req.protocol + '://' + req.get('host');
          res.status(200).json(notes);
        });
      });

    router.route('/notes/:note_id')
      .get(function (req, res) {

        Note.findById(req.params.note_id, function (err, note) {
          if (err)
            res.status(404).send(err);

          res.status(200).json(note);
        });
      })

      .put(function (req, res) {
        Note.findById(req.params.note_id, function (err, note) {
          if (err)
            res.status(404).send(err);

          note.title = req.body.title;
          note.note = req.body.note;
          note.save(function (err) {
            if (err)
              res.status(400).send(err);

            var host = req.protocol + '://' + req.get('host');
            res.status(200).json({ 
              note : { 
                message : 'Note updated',
                links : [
                  { link : host + '/api/notes/' + note.id, rel : 'self' },
                  { link : host + '/api/notes/' + note.id, rel : 'read' },
                  { link : host + '/api/notes/' + note.id, rel : 'delete' },
                  { link : host + '/api/notes/', rel : 'list' }
                ]
              }
            });

          })
        });
      })

      .delete(function (req, res) {
        var note_id = req.params.note_id;

        Note.remove({ id : note_id }, function (err, note) {
          if (err)
            res.status(400).send(err);

          var host = req.protocol + '://' + req.get('host');
          res.status(200).json({
             note : {
              message : 'The note (' + note_id + ') is successfully deleted',
              links: [
                  { link : host + '/api/notes/' + note_id, rel : 'self' },
                  { link : host + '/api/notes/' + note_id, rel : 'read' },
                  { link : host + '/api/notes/' + note_id, rel : 'update' },
                  { link : host + '/api/notes/', rel : 'list' }
              ]
            }
          });
        });
      })
      ;


  };

}(module.exports))