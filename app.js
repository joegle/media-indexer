var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var serveIndex = require('serve-index')
var serveStatic = require('serve-static')

var logger = require('morgan');

var db = require('./redisConnection')
var drafts = require('./draftsBlob');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var drafts = require('./routes/draft');
var scan = require('./routes/scan');
var text = require('./routes/text');
var scanNotes = require('./routes/scan-notes');
var images = require('./routes/images');
var notes = require('./routes/notes');
var bookmark = require('./routes/bookmark');

var app = express();

app.use(session({
    store: new RedisStore({host:"localhost"}),
    secret: 'keyboard cat'
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.locals.pretty = true;


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/static/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/static/mousetrap', express.static(__dirname + '/node_modules/mousetrap/'));

var f='/Users/joe/Pictures/Photos\ Library.photoslibrary/Masters';
//var f = '/Users/joe/Documents/images';

app.use('/images', serveIndex(f, {'icons': true}))
app.use('/images', express.static(f));


var noteFolder = '/Users/joe/Documents/notes';
app.use('/notes', serveIndex(noteFolder, {'icons': true}));
app.use('/notes', express.static(noteFolder));


var archivesFolder = './public/total';
app.use('/offline', serveIndex(archivesFolder, {'icons': true}));
app.use('/offline', express.static(archivesFolder));
	
var test = require("./routes/test");
app.use('/', routes);
app.use('/test', test);
app.use('/draft', drafts);
app.use('/users', users);
app.use('/scan', scan);
app.use('/text', text);
app.use('/scan-notes', scanNotes);
app.use('/image', images);
app.use('/note', notes)
app.use('/bookmark', bookmark);

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
