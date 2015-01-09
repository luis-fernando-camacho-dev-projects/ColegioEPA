var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// Database
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/colegioEPA", {native_parser:true});

var routes = require('./routes/index');
var student = require('./routes/student');

var subject = require('./routes/subject');

var teacher = require('./routes/teachers');

var schedule = require('./routes/schedule');

var app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.get('/', function(req, res) {
    res.render('index');
});

// ----------------- routes for student ----------------------------//

app.get('/teacher', function(req, res) {
    res.render('administrator/teacher');
});

app.get('/student', function(req, res) {
    res.render('administrator/student');
});

app.get('/subject', function(req, res) {
    res.render('administrator/subject');
});

app.get('/subject', function(req, res) {
    res.render('administrator/schedule');
});



// ----------------- end routes for student -------------------------//




//------------------------exta configuration ---------------------------------//

var allowCrossDomain = function(req, res, next) {
    console.log("writing cross domain headers...");
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};


app.use(allowCrossDomain);

//-------------------------end extra configuration ----------------------------//





// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded());
// new version
//app.use(bodyParser.urlencoded({ extended: true }));
// end new version
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'html')));

// Make our db accessible to our router
app.use(function(req,res,next) {
    req.db = db;
    next();
});

app.use('/', routes);
app.use('/student', student);
app.use('/teacher', teacher);
app.use('/subject', subject);
app.use('/schedule', schedule);


//static html content should be inserted here
// a convenient variable to refer to the HTML directory
var html_dir = './html/';

// routes to serve the static HTML files
app.get('/contact', function(req, res) {
    res.sendfile(html_dir + 'contact.html');
});
// Note: route names need not match the file name
app.get('/hello', function(req, res) {
    res.sendfile(html_dir + 'hello.html');
});

app.get('/index', function(req, res) {
    res.sendfile(html_dir + 'index.html');
});





//end static html content should be inserted here



/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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
