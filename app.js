var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');
// Database connection start //
var mongo = require('mongoskin'),
    db = mongo.db("mongodb://localhost:27017/colegioEPA", {native_parser:true});
// Database connection end //

/* rest classes Start*/
var routes = require('./routes/index');
    student = require('./routes/student'),
    subject = require('./routes/subject'),
    teacher = require('./routes/teacher'),
    course = require('./routes/course'),
    schedule = require('./routes/schedule'),
    enrollment = require('./routes/enrollment'),
    attendance = require('./routes/attendance'),
    user = require('./routes/user'),
    utils = require('./routes/utils'),
    enrollmentStudent = require('./routes/attendanceStudent'),
    validationData = require('./routes/checkData'),
    app = express();
/* rest classes End*/

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.get('/', function(req, res) {
    res.render('index');
});

//----------------- routes App Start----------------------------//
//--------Administrator Options ------------------------------//
app.get('/teacher', function(req, res) {
    res.render('administrator/teacher');
});

app.get('/student', function(req, res) {
    res.render('administrator/student');
});

app.get('/subject', function(req, res) {
    res.render('administrator/subject');
});

app.get('/schedule', function(req, res) {
    //res.render('schedule/index');
    res.render('administrator/schedule');
});

app.get('/course', function(req, res) {
    res.render('administrator/course');
});

app.get('/enrollment', function(req,res) {
    res.render('administrator/enrollment');
});

app.get('/user', function(req, res) {
    res.render('administrator/user');
});

app.get('/teacherSchedule', function(req, res) {
  res.render('administrator/teacherSchedule');
});


//---------------------End Administrators Options---------------------------//

//---------------------Teachers Options ---------------------------------//
app.get('/teacher/attendance', function(req, res) {
    res.render('teacher/attendance');
});
app.get('/teacher/schedules', function(req, res) {
    res.render('teacher/schedules');
});
app.get('/teacher/subjects', function(req, res) {
    res.render('teacher/subjects');
});
//--------------------- End Teachers Options ---------------------------------//

//------------------------Student Options -------------------------------------//
app.get('/student/courses', function(req, res) {
    res.render('student/courses');
});
app.get('/student/schedules', function(req, res) {
    res.render('student/schedules');
});
app.get('/student/attendance', function(req, res) {
    res.render('student/attendance');
});
//------------------------ END Student Options -------------------------------------//

app.get('/login', function(req, res) {
    res.render('login');
});

// ----------------- routes App End----------------------------//



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
        console.log('req',req.method);
      next();
    }
};


app.use(allowCrossDomain);

//-------------------------end extra configuration ----------------------------//

//------------------------- start load javascript libraries ---------------------------//


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

// Auth Middleware - This will check if the token is valid
// Only the requests that start with /api/* will be checked for the token.
// Any URL's that do not follow the below pattern should be avoided unless you
// are sure that authentication is not needed
app.all('/api/*', [require('./middlewares/validateRequest')]);

// start uris//
app.use('/', routes);

app.use('/api/student', student);
app.use('/api/teacher', teacher);
app.use('/api/subject', subject);
app.use('/api/course', course);
app.use('/api/enrollment', enrollment);
app.use('/api/attendance', attendance);
app.use('/validateData',validationData);
app.use('/enrollment', enrollmentStudent);
// utils
app.use('/utils', utils);
// end uris //
// modificar esto //
app.use('/user', user);

/** define uris end */


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
