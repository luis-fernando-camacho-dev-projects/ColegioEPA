var express = require('express');
var router = express.Router();
var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;


router.get('/courses', function(req, res) {
    console.log(req.query);
    var language= req.headers["accept-language"];
    var queryRequest = req.query;
    var db = req.db;
    var value = {};
    var dateQuery = new Date(parseInt(queryRequest.year), parseInt(queryRequest.month), parseInt(queryRequest.day),0,0,0,0);
    db.collection('courseList', function(err, collection) {
         collection.find().sort({startTime:1}).toArray(function(err, courses) {
                if (err) {

                } else {
                    var coursesAvaliables = [];
                    courses.forEach(function(course) {
                        var regExpressionBackSlash = new RegExp('-', 'g'), startTimeNewCourse = new Date(course.endDate.replace(regExpressionBackSlash,'/')), dates;
                        if (language.indexOf('es') != 0) {
                            dates = course.endDate.split('-');
                            console.log("ISNAN");
                            startTimeNewCourse = new Date(parseInt(dates[2]), parseInt(dates[1]), parseInt(dates[0]));
                        }
                        console.log('startTimeNewCoures',startTimeNewCourse);
                        if (startTimeNewCourse >= dateQuery) {
                            console.log('course',course);
                            coursesAvaliables.push(course);
                        }
                    }, this);
                    res.send({courses: coursesAvaliables});
                }
        });
    });
});
router.get('/coursesDetails/:courseId', function(req, res) {
    console.log(req.query);
    var db = req.db;
    var courseId = req.params.courseId;
    var value = {};
    console.log('courseId', courseId);
    db.collection('courseList', function(err, collection) {
         collection.find({'_id':new BSON.ObjectID(courseId)}).toArray(function(err, courses) {
                console.log('couress,,',courses);
                db.collection('subjectList', function(err, collection) {
                    collection.find({'_id':new BSON.ObjectID(courses[0].subject)}).toArray(function(err,subject) {
                        courses[0].subjectDetails = subject[0];
                        res.json({courses:courses});
                    });
                });
            });
        });
});

router.get('/userName/:login', function(req, res) {
    var db = req.db, loginSearch = req.params.login, result;
    db.collection('userList',function(err, collection) {
        collection.findOne({login: loginSearch}, function(err, user) {
            result = { value:loginSearch, valid:false, message:"El login ya esta siendo usado"};
            if (user === null) {
                result.valid = true;
            }
            res.send(result);
        });
    });

    /*
   var result = { value:login, valid:false, message:"Must start with an uppercase letters"};
   res.send(result);
   */
});

router.get('/ci/:ci', function(req, res) {
    var db = req.db, ciSearch = parseInt(req.params.ci), result = {value:ciSearch, valid:false, message:'el ci ya exite y esta siendo por otro usuario'};
    console.log(ciSearch);
    db.collection('teacherList',function(err, collectionTeacher) {
        collectionTeacher.findOne({ci : ciSearch}, function(err, teacher) {
            console.log('teacher',teacher);
            console.log('errteacher',err);
            if (teacher === null) {
                db.collection('studentList', function(err, collectionStudent) {
                    collectionStudent.findOne({ci:ciSearch}, function(err, student) {
                        console.log('errstudent',student);
                        console.log('student', student);
                        if(student === null) {
                            result.valid = true;
                            res.send(result);
                        } else {
                            res.send(result);
                        }
                    });
                });
            } else {
                res.send(result);
            }
        });
    });

});
module.exports = router;
