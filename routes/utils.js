var express = require('express');
var router = express.Router();
var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

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
