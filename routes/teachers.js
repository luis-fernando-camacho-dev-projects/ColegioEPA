var express = require('express');
var router = express.Router();

/*
 * GET studentlist.
 */
router.get('/getTeachers', function(req, res) {
    var db = req.db;
    db.collection('teacherList').find().toArray(function (err, items) {
        res.json(items);
    });
});

/*
 * POST to addstudent.
 */
router.post('/addTeacher', function(req, res) {
    var db = req.db;
    db.collection('teacherList').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: 'success' } : { msg: err }
        );
    });
});

router.put('/updateTeacher/:id' , function(req, res) {
    var db = req.db;
    var student =req.db;
    var studentId = req.params.id;
    db.collection('teacherList').update({_id: req.collection.id(req.params.id)},{$set:req.body}, {safe:true, multi:false}, function(e, result){
        if (e) return next(e)
            res.send((result===1)?{msg:'success'}:{msg:'error'});
    });
    
});


/*
 * DELETE to deletestudent.
 */
router.delete('/deleteTeacher/:id', function(req, res) {
    var db = req.db;
    var studentToDelete = req.params.id;
    db.collection('teacherList').removeById(studentToDelete, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;