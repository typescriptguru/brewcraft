var fs = require('graceful-fs');
var randomAccessFile = require('random-access-file');
var global = require('../global/config');
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'wbitsale@gmail.com',
        pass: 'wbit2017'
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: 'Do not reply: Brewcraft', // sender address
    to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plain text body
    html: '<b>Hello world ?</b>' // html body
};

function uploadPhoto(data, filepath) {
    data = data.replace(/^data:image\/jpeg;base64,/, "");
    data = data.replace(/^data:image\/png;base64,/, "");
    var imageBuffer = new Buffer(data, 'base64'); //console = <Buffer 75 ab 5a 8a ...
    fs.writeFile('public/' + filepath, imageBuffer, function (err) {
        console.log(err);
        return filepath;
    });
}

function sendMail(to, subject, message) {
    mailOptions.to = to;
    mailOptions.subject = subject;
    mailOptions.html = message;
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
    });
}

module.exports = {
    SERVER_URL: global.server_url,
    responseHandler: (res, success, message, data) => {
        res.send({
            success: success,
            message: message,
            data: data
        });
    },
    uploadPhoto: uploadPhoto,
    sendMail: sendMail
}