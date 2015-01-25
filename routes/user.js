
var express = require('express');
var router = express.Router();
var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

/*
 * GET studentlist.
 */
router.get('/users', function(req, res) {
    var db = req.db;
    db.collection('userList', function(err, collection) {
         collection.find().toArray(function(err, items) {
            var allLocations = {
                users:items
            };
            res.send(allLocations);
        });
    });
});

/*
 * POST to addstudent.
 */
router.post('/users', function(req, res) {
    console.log('inside users');
    var user = req.body.user;
    var db = req.db;
    console.log('user information: ' + JSON.stringify(user));
    var collectionName = user.role === 'student' ? 'studentList' : 'teacherList';
    var role = { nombre: user.token, ci : user.login , email : 'vacio', birthDate:'', courses: []};
    var retrieveRole = null;
    db.collection(collectionName, function(err, collection) {
        collection.insert(role, {safe:true} , function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred ' + err});
            }
            console.log('result:'+ JSON.stringify(result));
        });
        retrieveRole = collection.findOne({ci : role.ci}, {fields:{_id:1}}, function(err, doc) {
            console.log('doc'+doc);
            if (user.role == 'student') {
                user.student = doc._id;
            } else if (user.role === 'teacher') {
                user.teacher = doc._id;
            }
            db.collection('userList', function(err, collection) {
                collection.insert(user, {safe:true}, function(err, result) {
                    if (err) {
                        res.send({'error':'An error has occurred ' + err});
                    }
                    res.json({user:user});
                });
            });
        });

    });
});

router.put('/users/:id' , function(req, res) {
    var db = req.db;
    var id = req.params.id;
    var user = req.body.user;

    console.log(req.body);
    console.log('Updating user with id [' + id + ']');
    console.log('user payload = ' + JSON.stringify(user));

    db.collection('userList', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, user, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating user: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                user._id = id;
                res.json({user:user});
            }
        });
    });
});


/*
 * DELETE to deletestudent.
 */
router.delete('/users/:id', function(req, res) {
    var db = req.db;
    var id = req.params.id;
    console.log('Deleting location: ' + id);
    db.collection('userList', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.json({});
            }
        });
    });

});

module.exports = router;
