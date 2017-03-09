require('dotenv').load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var url = require('url');

var index = require('./routes/index');
var users = require('./routes/users');
var notes = require('./routes/notes');
var getlink = require('./routes/getlink');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./lib/parse-query'))

// hide all url from spiderbot
app.get('/robots.txt', (req, res) => {
  res.setHeader('Content-Type', 'text/plain')
  res.end('User-agent: *\nDisallow: /')
})

app.use('/', index);
app.use('/users', users);
app.use('/noteadd', notes.add);
app.post('/notesave', notes.save);
app.use('/noteview', notes.view);
app.use('/noteedit', notes.edit);
app.use('/notedestroy', notes.destroy);
app.post('/notedodestroy', notes.dodestroy);
app.use('/getlink', getlink.index);


// Create API Stream Video
app.get('/videoplayback', require('./lib/videoplayback'))

// // Create API Get Video From Google Drive
app.get('/api/googledrive/:id', function (req, res, next) {
  // Basic auth
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  const getVideo = require('./lib/get-video')
  getVideo(req, res, req.params.id)
  if (query.token == '123') {
    const getVideo = require('./lib/get-video')
    getVideo(req, res, req.params.id)
  } else {
    var err = new Error('Page Not Found');
    err.status = 404;
    next(err);
  }
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
