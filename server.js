var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session')

var port = process.env.PORT || 8080
var router = express.Router();

app.set('view engine', 'vash');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use('/api', router);
app.use('/', express.static('./public'));
app.use(cookieParser('tnote'));
app.use(session({
  cookie: { maxAge: 60000 },
  secret: 'tnote',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/note');

var controllers = require('./server/controllers');
controllers.init(app, router);

var server = app.listen(port, function () {
	console.log('listening on port %d', server.address().port);
});

