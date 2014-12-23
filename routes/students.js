
var express = require('express');
var router = express.Router();

/*
 * GET studentlist.
 */
router.get('/getStudents', function(req, res) {
    var db = req.db;
    db.collection('studentList').find().toArray(function (err, items) {
        res.json(items);
    });
});

/*
 * POST to addstudent.
 */
router.post('/addStudent', function(req, res) {
    var db = req.db;
    db.collection('studentList').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: 'success' } : { msg: err }
        );
    });
});

router.put('/updateStudent/:id' , function(req, res) {
    var db = req.db;
    var student =req.db;
    var studentId = req.params.id;
    db.collection('studentList').update({_id: req.collection.id(req.params.id)},{$set:req.body}, {safe:true, multi:false}, function(e, result){
        if (e) return next(e)
            res.send((result===1)?{msg:'success'}:{msg:'error'});
    });
    
});


/*
 * DELETE to deletestudent.
 */
router.delete('/deleteStudent/:id', function(req, res) {
    var db = req.db;
    var studentId = req.params.id;
    db.collection('studentList').removeById(studentId, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;