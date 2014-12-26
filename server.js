var express = require('express');
var app = express();
var router = express.Router();

var bodyParser = require('body-parser');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session')

var port = process.env.PORT || 3000

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

var controllers = require('./server/controllers');
controllers.init(app, router);

var server = app.listen(port, function () {
	console.log('listening on port %d', server.address().port);
});

