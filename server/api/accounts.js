var express = require('express');
var router = express.Router();
var fs = require('graceful-fs');
var bCrypt = require('bcrypt-nodejs');
var Util = require('../lib/util');
var db = require('firebase').database();
var model = require('../model/model');
var auth = require('firebase').auth();

router.post('/add', (req, res) => {
    req.body.password = [req.body.password];

    db.ref('users/' + req.body.uid).once('value')
        .then(snapshot => {
            if (snapshot.val() == null) {
                db.ref('users/' + req.body.uid).set(req.body)
                    .then(account => {
                        Util.responseHandler(res, true);
                    });
            }
        });
});

router.get('/get/:uid', (req, res) => {
    console.log(req.params.uid);
    db.ref('users/' + req.params.uid).once('value')
        .then(snapshot => {
            if (snapshot.val() == null)
                Util.responseHandler(res, false, 'The user with such uid doesn\'t exists', null);
            else
                Util.responseHandler(res, true, 'Success', snapshot.val());
        })
})

router.get('/send-password-reset-mail/:email', (req, res) => {
    console.log('password reset mail', req.params.email);
    auth.sendPasswordResetEmail(req.params.email)
        .then(result => {
            Util.responseHandler(res, true, 'Password reset email has sent to your email address');
        })
        .catch(result => {
            console.log(result);
            Util.responseHandler(res, false, 'You have exceeded reset password limit');
        })
})

router.get('/reset-password/:code/:newpassword', (req, res) => {
    console.log('password reset confirm', req.params.code, req.params.newpassword);
    var password = req.params.newpassword;
    auth.verifyPasswordResetCode(req.params.code)
        .then(email => {
            db.ref('users').orderByChild('email').equalTo(email).once('value', (snapshot) => {
                var uid = Object.keys(snapshot.val())[0];
                var user = snapshot.val()[uid];
                var repeat_password_count = 0;
                for(var i = 0 ; i < user.password.length; i ++) {
                    if(user.password[i] == password)
                        repeat_password_count ++;
                }
                if(repeat_password_count < 5) {

                    auth.confirmPasswordReset(req.params.code, req.params.newpassword)
                        .then(result => {
                            Util.responseHandler(res, true, 'Password reset successfully');
                        }).catch(err => {
                            Util.responseHandler(res, false, err.message);
                        })
                    user.password.push(password);
                    user.locked = false;
                    db.ref('users/' + uid).set(user)
                        .then(user => console.log(user));
                } else {
                    Util.responseHandler(res, false, 'You have already used the same password 5 times. Please use different one');
                }
            })
        })
        .catch(err => {
            Util.responseHandler(res, false, err.message);
        })
})

router.get('/check-locked/:uid', (req, res) => {
    db.ref('users/' + req.params.uid).once('value', (snapshot) => {
        Util.responseHandler(res, true, 'Success', {
            locked: snapshot.val().locked
        })
    })
})

router.put('/lock/:email', (req, res) => {
    db.ref('users').orderByChild('email').equalTo(req.params.email).once('value', (snapshot) => {
        var uid = Object.keys(snapshot.val())[0];
        var user = snapshot.val()[uid];
        if(user != null) {
            var account = db.ref('users/' + user.uid);
            account.update({ locked: true }, (err) => {
                console.log(err);
                if(err) {
                    Util.responseHandler(res, false, 'Error occured while locking the account');
                } else {
                    Util.sendMail(req.params.email, "Account locked", `
                    Your account has been locked due to security reasons. Please follow this link to change your password.<br>
                    http://localhost:4200/change-password
                    `);
                    Util.responseHandler(res, true, 'The account has been locked');
                }
            })
        }
    });
})

router.put('/lockout/:uid', (req, res) => {
    var account = db.ref('users/' + req.params.uid);
    account.update({ locked: false }, (err) => {
        console.log(err);
        if(err) {
            Util.responseHandler(res, false, 'Error occured while unlocking the account');
        } else {
            Util.responseHandler(res, true, 'The account has been locked out');
        }
    })
})

// Generates hash using bCrypt
var createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

module.exports = router;