var logger = require('morgan');
var cors = require('cors');
var http = require('http');
var express = require('express');
var errorhandler = require('errorhandler');
var dotenv = require('dotenv');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./global/config');
var session = require('express-session');
var passport = require('passport');
var path = require('path');
var fs = require('graceful-fs');

// Initialize Passport
var initPassport = require('./passport-init');
initPassport(passport);

// Requrie apis
var authenticate = require('./api/authenticate')(passport);
var accountHandler = require('./api/accounts');
var imageHandler = require('./api/images');
var clientHanlder = require('./router.js');

require('./model/model');

var app = express();

//View Engine
app.set('views', path.join(__dirname, '../client/dist'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Embed File server
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '../client/dist')));

dotenv.load();

// Parsers
// old version of line
// app.use(bodyParser.urlencoded());
// new version of line

app.use(session({
  secret: 'keyboard cat',
  proxy: true,
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(cors());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(function (err, req, res, next) {
  if (err.name === 'StatusError') {
    res.send(err.status, err.message);
  } else {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next(err);
  }
});

app.get('/register', (req, res, next) => {
  console.log('signup');
  res.redirect('/');
  return;
});


if (process.env.NODE_ENV === 'development') {
  app.use(express.logger('dev'));
  app.use(errorhandler());
}

app.use('/auth', authenticate);
app.use('/accounts', accountHandler);
app.use('/images', imageHandler);
app.use('/*', clientHanlder);

var port = process.env.PORT || 80;

http.createServer(app).listen(port, function (err) {
  console.log('listening on port:' + port);
});


//  Database Connect
var dbUri = `mongodb://34.201.32.130:27017/recipe`;
mongoose.Promise = global.Promise;

var options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutcdMS: 30000 } }
};

var db = mongoose.connect(dbUri, options);
mongoose.connection.on('open', () => {
  console.log('Database connected...');
})

  // Database end