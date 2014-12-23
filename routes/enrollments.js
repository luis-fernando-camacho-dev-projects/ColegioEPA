var express = require('express');
var router = express.Router();

/*
 * GET studentlist.
 */
router.get('/getEnrollments', function(req, res) {
    var db = req.db;
    db.collection('enrollmentList').find().toArray(function (err, items) {
        res.json(items);
    });
});

/*
 * POST to addstudent.
 */
router.post('/addEnrollment', function(req, res) {
    var db = req.db;
    db.collection('enrollmentList').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: 'success' } : { msg: err }
        );
    });
});

router.put('/updateEnrollment/:id' , function(req, res) {
    var db = req.db;
    var enrollmentId = req.params.id;
    db.collection('enrollmentList').update({_id: req.collection.id(enrollmentId)},{$set:req.body}, {safe:true, multi:false}, function(e, result){
        if (e) return next(e)
            res.send((result===1)?{msg:'success'}:{msg:'error'});
    });
    
});


/*
 * DELETE to deletestudent.
 */
router.delete('/deleteEnrollment/:id', function(req, res) {
    var db = req.db;
    var enrollmentId = req.params.id;
    db.collection('enrollmentList').removeById(enrollmentId, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;