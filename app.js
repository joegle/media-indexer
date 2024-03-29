var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var serveIndex = require('serve-index');
var serveStatic = require('serve-static');

var logger = require('morgan');

var db = require('./redisConnection');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Routes
var routes = require('./routes/index');
var users = require('./routes/users');
var scan = require('./routes/scan');
var images = require('./routes/images');

var app = express();

app.use(session({
    store: new RedisStore({host:"localhost"}),
    secret: 'niyti6ru5ry'
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.locals.pretty = true;

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/static', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/static/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/static/mousetrap', express.static(__dirname + '/node_modules/mousetrap/'));

var folder = 'mounts/';

app.use('/images', serveIndex(folder, {'icons': true}));
app.use('/images', express.static(folder));


app.use('/', routes);

// Demo of sessions
app.use('/users', users);

// Scan directory 
app.use('/scan', scan);

app.use('/image', images);

app.on('listening',function(){
    console.log('📺 Listening');
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;

