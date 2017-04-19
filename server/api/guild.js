var express = require('express');
var router = express.Router();
var fs = require('graceful-fs');
var Util = require('../lib/util');
var db = require('firebase').database();
var Account = require('../model/model').Account;
var Guild = require('../model/model').Guild;

var guildsRef = db.ref('guilds');
var usersRef = db.ref('users');

router.post('/request', (req, res) => {
    var guild = new Guild();
    Util.copyProps(guild, req.body);

    db.ref('users/' + guild.chief).once('value', (snapshot) => {
        var user = snapshot.val();
        if (user.guildID == "") {
            var guildRef = db.ref('guilds').push(guild, (err) => {
                console.log(err);
                if (err)
                    Util.responseHandler(res, false, err.message);
                else {
                    Util.responseHandler(res, true, "Your guild has been successfully requested");
                }
            })
            db.ref('users/' + req.body.chief).update({ guildID: guildRef.key, isChief: true });
        } else {
            Util.responseHandler(res, false, "You have to leave your guild to create your own guild");
        }
    })
})

router.put('/approve', (req, res) => {
    var guildKey = req.body.key;
    db.ref('guilds/' + guildKey).update({
        status: 'on'
    }, (err) => {
        if (err)
            Util.responseHandler(res, false, err.message);
        else
            Util.responseHandler(res, true, "The guild has been approved");
    });
})

router.post('/request-member', (req, res) => {
    var guildID = req.body.guildID;
    var userID = req.body.userID;

    db.ref('users/' + userID).once('value', (snapshot) => {
        var user = snapshot.val();
        if (user.guildID == "" || user.guildID == undefined) {
            db.ref('guilds/' + guildID).once('value', (snapshot) => {
                var guild = snapshot.val();
                if (guild.pendingMembers == undefined)
                    guild.pendingMembers = [];
                guild.pendingMembers.push(userID);

                db.ref('guilds/' + guildID).update(guild);

                Util.responseHandler(res, true);
                db.ref('users/' + guild.chief).once('value', (snapshot) => {
                    var chief = snapshot.val();
                    Util.sendMail(chief.email, "You have got a guild request", `
                        You recently have member request from '${user.fullname}'
                    `);
                })
            })
        } else {
            Util.responseHandler(res, false, "You have to leave your guild to join other guild");
        }
    })
})

router.post('/invite-member', (req, res) => {
    var guildID = req.body.guildID;
    var userID = req.body.userID;

    db.ref('users/' + userID).once('value', (snapshot) => {
        var user = snapshot.val();
        // if (user.guildID == "" || user.guildID == undefined) {
            if(user.guildInvites == undefined)
                user.guildInvites  = [];
            user.guildInvites.push(guildID);
            db.ref('users/' + userID).update(user)
                .then(r => Util.responseHandler(res, true))
            db.ref('guilds/' + guildID).once('value', (snapshot) => {
                var guild = snapshot.val();
                Util.sendMail(user.email, '', `
                    You have been invited to ${guild.name}
                `)
            })
        // } else {
        //     Util.responseHandler(res, false, "The user has already joined other guild");
        // }
    })
})

router.post('/confirm-member', (req, res) => {
    var guildID = req.body.guildID;
    var userID = req.body.userID;

    db.ref('guilds/' + guildID).once('value', (snapshot) => {
        var guild = snapshot.val();
        if (guild.pendingMembers == undefined)
            guild.pendingMembers = [];
        var pos
        while ((pos = guild.pendingMembers.indexOf(userID)) > -1) {
            guild.pendingMembers.splice(pos, 1);
        }
        db.ref('guilds/' + guildID).update(guild);

        db.ref('users/' + userID).once('value', (snapshot) => {
            var user = snapshot.val();
            if (user.guildID == "" || user.guildID == undefined) {
                user.guildID = guildID;
                user.guildInvites = [];
                db.ref('users/' + userID).update(user)
                    .then(r => {
                        Util.responseHandler(res, true, 'Successfully confirm guild member');
                        Util.sendMail(user.email, '', `You have joined "${guild.name}"`);
                    })
                    .catch(r => Util.responseHandler(res, false, 'Error whiel confirming guild member'))
            } else {
                Util.responseHandler(res, false, "The user already has joined other guild");
            }
        })
    })
})

router.post('/leave-guild', (req, res) => {
    var uid = req.body.uid;
    db.ref('users/' + uid).update({guildID: ""})
        .then(r => Util.responseHandler(res, true, "You left guild"))
        .catch(r => Util.responseHandler(res, false, "Error while leaving guild"))
})

module.exports = router;