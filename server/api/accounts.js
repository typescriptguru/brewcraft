var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var accountSchema = require('../model/model').accountSchema;
var accountModel = mongoose.model('Account', accountSchema);

var fs = require('graceful-fs');
var bCrypt = require('bcrypt-nodejs');
var ObjectId = mongoose.Types.ObjectId;
var Util = require('../lib/util');

router.get('/get/:id', (req, res) => {
    accountModel.findOne({
        _id: mongoose.Types.ObjectId(req.params.id)
    }, (err, doc) => {
        if (err || !doc) res.send({
            success: false,
            data: null
        });
        else {
            res.send({
                success: true,
                data: doc
            });
        }
    });
});
router.get('/get', (req, res) => {
    accountModel.find((err, docs) => {
        if (err) res.send({
            success: false,
            data: null
        });
        res.send({
            success: true,
            data: docs
        });
    })
});
router.delete('/:id/delete-network/:id1', (req, res) => {
    accountModel.update({_id: ObjectId(req.params.id)},
        { $pull: {
            accounts: mongoose.Types.ObjectId(req.params.id1)
        } },
        (err, raw) => {
            console.log(err, raw);
            if(err) Util.responseHandler(res, false, 'Connection Error', null);
            if(raw.nModified) Util.responseHandler(res, true, 'Success', null);
            else Util.responseHandler(res, false, 'Not removed', null);
    })
})
router.put('/update/:id', (req, res) => {
    var filepath = 'assets/gravatar/' + req.params.id + 'd.jpg';
    var password = createHash(req.body.password);

    var photoData = req.body.photo;

    console.log(req.body.photo);
    if(!photoData.includes('http')) {
        uploadPhoto(photoData, filepath);
        filepath = Util.SERVER_URL + filepath;
        req.body.photo = filepath;
    }

    accountModel.update({
            _id: mongoose.Types.ObjectId(req.params.id)
        }, req.body,
        (err, raw) => {
            if (err) res.send({
                success: false,
                message: 'Error'
            });
            else res.send({
                success: true,
                message: 'Updated succesfully'
            });
        });
});
router.delete('/close/:id', (req, res) => {
    accountModel.remove({
        _id: mongoose.Types.ObjectId(req.params.id)
    }, (err) => {
        console.log(req.params.id);
        if (err) res.send({
            success: false,
            message: 'Error'
        });
        else {
            res.send({
                success: true,
                message: 'Successfully closed the account'
            });
        }
    });
});
function uploadPhoto(data, filepath) {
    data = data.replace(/^data:image\/jpeg;base64,/, "");
    data = data.replace(/^data:image\/png;base64,/, "");
    var imageBuffer = new Buffer(data, 'base64'); //console = <Buffer 75 ab 5a 8a ...
    fs.writeFile('public/' + filepath, imageBuffer, function (err) {
        console.log(err);
        return filepath;
    });
}

 // Generates hash using bCrypt
var createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

module.exports = router;