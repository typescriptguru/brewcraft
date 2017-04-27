var express = require('express');
var router = express.Router();
var fs = require('graceful-fs');
var Util = require('../lib/util');
var db = require('firebase').database();

router.post('/add', (req, res) => {
    var userID = req.body.userID;
    db.ref('users/' + userID).once('value', (snapshot) => {
        db.ref('users/' + userID).update({ brewdays: snapshot.val().brewdays ? snapshot.val().brewdays + 1 : 1 })
        Util.responseHandler(res, true);
    })
})

module.exports = router;