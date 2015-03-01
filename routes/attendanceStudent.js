var express = require('express');
var router = express.Router();
var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

/** get course attendance by studentId and courseId */
router.get('/attendanceStudent', function(req, res) {
    var db = req.db;
    console.log("request query",JSON.stringify(req.query));
    db.collection('attendanceList', function(err, collectionAttendance) {
        var queryCourse = {};
        if (req.query.course != null)
        {
            queryCourse = {course:{'$in':JSON.parse(req.query.course)}};
            console.log(queryCourse);
        }
        collectionAttendance.find(queryCourse).toArray(function(err, attendances) {
                    res.send(attendances);
        });
    });
});

/** get enrollments courses by Student Id */
router.get('/enrollementCourses/:studentId', function(req, res) {
    var db = req.db;
    var studentId = req.params.studentId;
    db.collection('enrollmentList').findOne({student:studentId}, function(err, enrollmentInstance ) {
        console.log(JSON.stringify(enrollmentInstance));
        var courses =[];
        enrollmentInstance.courses.forEach(function(courseId){
            courses.push(BSON.ObjectID.createFromHexString(courseId));
        });
        var queryCourse = {_id:{'$in':courses}};
        console.log(queryCourse);
        db.collection('courseList').find(queryCourse).toArray(function(err, courses) {
            res.send(courses);
        });
    });
});

module.exports = router;
