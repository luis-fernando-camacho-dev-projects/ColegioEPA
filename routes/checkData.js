var express = require('express');
var router = express.Router();
var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

/*
 * GET studentlist.
 */
router.put('/validateCourse', function(req, res) {
    var courseToValidate = req.body;
    console.log('log',courseToValidate);
    var db = req.db;
    var value = {};
    db.collection('courseList', function(err, collection) {
        collection.find({'teacher': courseToValidate.teacher}).toArray(function(err, courses) {
            if (courses.length == 0) {
                res.json({
                    message:"successs"
                });
            } else {
                //refactorizar este codigo por favor es bien feo
                var regExpressionBackSlash = new RegExp('-', 'g');
                var datesStarTimes = courseToValidate.startDate.split('-');
                var startTimeNewCourse = new Date(parseInt(datesStarTimes[2]), parseInt(datesStarTimes[1])-1, parseInt(datesStarTimes[0]));
                var startTimeValues = courseToValidate.startTime.split(":");
                console.log('compareStartTime', startTimeNewCourse);

                startTimeNewCourse.setHours(parseInt(startTimeValues[0]));
                startTimeNewCourse.setMinutes(parseInt(startTimeValues[1]));
                var datesEndTimes = courseToValidate.endDate.split('-');
                var endTimeNewCourse = new Date(parseInt(datesEndTimes[2]), parseInt(datesEndTimes[1])-1, parseInt(datesEndTimes[0]));
                var endTimeValues = courseToValidate.endTime.split(":");
                endTimeNewCourse.setHours(parseInt(endTimeValues[0]));
                endTimeNewCourse.setMinutes(parseInt(endTimeValues[1]));
                console.log('compareEndTime', endTimeNewCourse);

                var validCourse = true;
                var messageError;

                courses.forEach(function(exitsCourse) {
                    var exitsStartDate = exitsCourse.startDate.split("-");
                    var existCourseStartTime = new Date(exitsStartDate[2],exitsStartDate[1]-1,exitsStartDate[0]);
                    var verifacteTime = exitsCourse.startTime.split(":");
                    existCourseStartTime.setHours(parseInt(verifacteTime[0]));
                    existCourseStartTime.setMinutes(parseInt(verifacteTime[1]));
                    console.log('startTime', existCourseStartTime);
                    var exitsEndCourse = exitsCourse.endDate.split("-");
                    var existCourseEndTime = new Date(exitsEndCourse[2],exitsEndCourse[1]-1,exitsStartDate[0]   );
                    var verifacteTime = exitsCourse.endTime.split(":");
                    existCourseEndTime.setHours(parseInt(verifacteTime[0]));
                    existCourseEndTime.setMinutes(parseInt(verifacteTime[1]));
                    console.log('endTime', existCourseEndTime);
                    if (validCourse) {
                        if (existCourseStartTime >= startTimeNewCourse && existCourseStartTime <= endTimeNewCourse) {
                                messageError = "Hay un conflicto con el curso :"+exitsCourse.name;
                                validCourse = false;
                        }
                    }
                },
                this);
                if (validCourse) {
                    res.json({message:"successs"});
                } else {
                    res.status(401)
                    res.json({
                        "status": 401,
                        "message": messageError
                    });
                }
            }
        });
    });
});
router.put('/validateEnrollment', function(req, res) {
    var db = req.db;
    var newEnrollment = req.body;
    db.collection('enrollmentList', function(err, collection) {
        collection.find({'student': newEnrollment.student}).toArray(function(err, enrollmentsFound) {
            var newCourses = newEnrollment.courses;
            var validEnrollment=true;
            var messageError, courseId;
            enrollmentsFound.forEach(function(enrollmentOld){
                for (var i=0;i<newCourses.length;i++) {
                    if (enrollmentOld.courses.indexOf(newCourses[i]) == 0)
                    {
                        validEnrollment = false;
                        messageError = "Ya existe una inscripcion con el curso:"+newCourses[i];
                        courseId = newCourses[i];
                    }
                }
            }, this);
            if (validEnrollment) {
                res.json({message:"successs"})
            } else {
                res.status(401).send({message: messageError, courseId : courseId});
            }
        });
    });
});
module.exports = router;
