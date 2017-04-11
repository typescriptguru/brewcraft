var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var accountSchema = require('../model/model').accountSchema;
var accountModel = mongoose.model('Account', accountSchema);
var imageSchema = require('../model/model').imageSchema;
var imageModel = mongoose.model('Image', imageSchema);

var fs = require('graceful-fs');
var bCrypt = require('bcrypt-nodejs');
var ObjectId = mongoose.Types.ObjectId;
var Util = require('../lib/util');

router.get('/get/:id', (req, res) => {
    imageModel.findOne({
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
    imageModel.find({}, (err, images) => {
        if (err) res.send({
            success: false,
            data: null
        });
        else {
            res.send({
                success: true,
                data: images
            });
        }
    });
});

router.get('/get-by-user/:id', (req, res) => {
    imageModel.find({ owner: req.params.id }, (err, docs) => {
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

router.delete('/remove/:id', (req, res) => {
    imageModel.remove({
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
                message: 'Successfully removed the image'
            });
        }
    });
});

router.post('/save', (req, res) => {
    var photoData = req.body.image;
    var caption = req.body.caption;
    var owner = req.body.owner;
    var imageId = req.body.imageId;

    var filepath = 'gallery/' + owner + new Date().getTime() + '.jpg';

    if(photoData.indexOf('http') === -1) {
        uploadPhoto(photoData, filepath);
        filepath = Util.SERVER_URL + filepath;
    } else {
        filepath = photoData;
    }
    console.log(photoData, filepath);
    if (imageId === '') {
        var Image = new imageModel({
            caption: caption,
            path: filepath,
            owner: owner
        });
        Image.save((err, image, num) => {
            if (image) {
                Util.responseHandler(res, true, "Image has been created succesfully", image);
            } else {
                Util.responseHandler(res, false, "There has been an error while saving the image", null);
            }
        });
    } else {
        imageModel.update({ _id: mongoose.Types.ObjectId(imageId) }, {
            caption: caption,
            path: filepath,
            owner: owner
        }, (err, raw) => {
            console.log(err, raw);
            if (!err) {
                Util.responseHandler(res, true, "Image has been updated succesfully", {
                    caption: caption,
                    path: filepath,
                    owner: owner,
                    _id: imageId
                });
            } else {
                Util.responseHandler(res, false, "There has been an error while updating the image", null);
            }
        });
    }
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


module.exports = router;