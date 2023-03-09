var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var projectsRouter = require('./routes/projects');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'public'));


// Route pour servir le fichier CSS
app.get('/public/stylesheets/style.css', function(req, res) {
  res.type('text/css');
  res.sendFile(path.join(__dirname, '/public/stylesheets/style.css'));
});

app.use('/images', express.static(path.join(__dirname, 'public/images')));


// Route pour servir le fichier JS
app.get('/public/javascripts/functions.js', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/javascripts/functions.js'));
});



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/Projects', projectsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
