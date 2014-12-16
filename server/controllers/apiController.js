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
        note.content = req.body.content;

        note.save(function (err) {
          if (err)
            res.status(400).send(err);

          var host = req.protocol + '://' + req.get('host');
          res.status(201).json({ 
            message : 'Note created',
            id : note.id,
            links : [
              { uri : host + '/api/notes/' + note.id, rel : 'self' },
              { uri : host + '/api/notes/' + note.id, rel : 'update' },
              { uri : host + '/api/notes/' + note.id, rel : 'delete' },
              { uri : host + '/api/notes/', rel : 'list' }
            ]
          });
        });

      })

      .get(function (req, res) {
        Note.find(function (err, notes) {
          if (err) 
            res.status(400).send(err);

          res.status(200).json(notes);
        });
      });

    router.route('/notes/:note_id')
      .get(function (req, res) {

        Note.findById(req.params.note_id, function (err, note) {
          if (err)
            res.status(404).send(err);

          res.status(200).json({
            id: note.id,
            content: note.content,
            title: note.title
          });
        });
      })

      .put(function (req, res) {
        Note.findById(req.params.note_id, function (err, note) {
          if (err)
            res.status(404).send(err);

          note.title = req.body.title;
          note.content = req.body.content;
          note.save(function (err) {
            if (err)
              res.status(400).send(err);

            var host = req.protocol + '://' + req.get('host');
            res.status(200).json({ 
              note : { 
                message : 'Note updated',
                links : [
                  { uri : host + '/api/notes/' + note.id, rel : 'self' },
                  { uri : host + '/api/notes/' + note.id, rel : 'read' },
                  { uri : host + '/api/notes/' + note.id, rel : 'delete' },
                  { uri : host + '/api/notes/', rel : 'list' }
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
                  { uri : host + '/api/notes/' + note_id, rel : 'self' },
                  { uri : host + '/api/notes/' + note_id, rel : 'read' },
                  { uri : host + '/api/notes/' + note_id, rel : 'update' },
                  { uri : host + '/api/notes/', rel : 'list' }
              ]
            }
          });
        });
      })
      ;


  };

}(module.exports))