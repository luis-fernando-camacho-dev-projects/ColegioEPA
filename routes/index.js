var express = require('express');
var router = express.Router();

var jwt = require('jwt-simple');
var sha1 = require('sha1');

/*
* Routes that can be accessed by any one
*/
router.post('/login', function(req, res) {
    var db = req.db, username = req.body.username || '', password = req.body.password || '';

    if (username === '' || password === '') {
        _failWithInvalidCredentials(res);
        return;
    }
    db.collection('userList').findOne({'login': username}, function(err, user) {
        if (err) {
            res.send({
                'error':'An error has occurred - ' + err
            });
            return;
        }
        if (user && _isValidPassword(password, user.password)) {
            // If authentication is success, we will generate a token
            // and dispatch it to the client
            res.json(_genToken(user));
        } else {
            // If authentication fails, we send a 401 back
            _failWithInvalidCredentials(res);
            return;
        }
    });
});

function _failWithInvalidCredentials(res) {
    res.status(401);
    res.json({
        "status": 401,
        "message": "Invalid credentials"
    });
};

// private method
function _genToken(user) {
    var expires = _expiresIn(7); // 7 days
    var token = jwt.encode({
        exp: expires,
        key: user._id
    }, require('../config/secret')());

    var userResponse = user;
    userResponse.token = token;
    userResponse.typeUser = 'testType';
    userResponse._idUser ='IdUser';

    return userResponse;
};

function _expiresIn(numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
};

function _isValidPassword(rawPassword, encodedPassword) {
    return encodedPassword == rawPassword;
    //return encodedPassword == sha1(rawPassword);//preguntar al beto como le envio un sha1  o hash desde un controllador
};

exports.index = function(req, res){
  res.render('index', { title: 'ejs' });
};

module.exports = router;
