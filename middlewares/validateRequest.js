"use strict";

var jwt = require('jwt-simple');

var mongo = require('mongodb');
var BSON = mongo.BSONPure;

module.exports = function(req, res, next) {

    // When performing a cross domain request, you will recieve
    // a preflighted request first. This is to check if our the app
    // is safe.
    var token = (req.body && req.body.api_key) || (req.query && req.query.api_key) || req.headers['api_key'];
    console.log('TOKEN: '+token);
    if (token) {
        try {
            var decoded = jwt.decode(token, require('../config/secret.js')());

            if (decoded.exp <= Date.now()) {
                _failWithError(res, 400, "Session Expired", {});
                return;
            }

            var db = req.db;
            var userId = BSON.ObjectID.createFromHexString(decoded.key);
            db.collection('users').findOne({'_id': userId}, function(err, user) {

                if (err) {
                    _failWithError(res, 500, "Oops something went wrong", err);
                    return;
                }

                // The key would be the logged in user's username
                if (user) {
                    next(); // To move to next middleware
                } else {
                    // No user with this name exists, respond back with a 401
                    _failWithError(res, 401, "Invalid User", {});
                    return;
                }
            });

        } catch (err) {
            console.log(err);
            _failWithError(res, 500, "Oops something went wrong", err);
        }
    } else {
        _failWithError(res, 401, "Invalid session id or key", {});
        return;
    }
};

function _failWithError(res, code, message, err) {
    res.status(code);
    res.json({
        "code": code,
        "message": message,
        "error": err
    });
};
