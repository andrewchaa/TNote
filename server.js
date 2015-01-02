var express = require('express');
var app = express();
var router = express.Router();

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var port = process.env.PORT || 3000

try {
  require('./config')();
} catch {
  console.log("No config, it must be in production.");
}

var secret = process.env.AUTH_JWT_SECRET;

app.set('view engine', 'vash');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(cookieParser('tnote'));

app.use('/', express.static('./public'));
app.use('/api', expressJwt({ secret: secret }));
app.use('/api', router);

var controllers = require('./server/controllers');
controllers.init(app, router);

var server = app.listen(port, function () {
	console.log('listening on port %d', server.address().port);
});
