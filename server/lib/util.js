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
    fs.writeFile('public' + filepath, imageBuffer, function (err) {
        console.log(err);
        return filepath;
    });
}

function copyProps(dest, src) {
    for(var k in src) dest[k]=src[k];
}

function sendMail(to, subject, message) {
    mailOptions.to = to;
    mailOptions.subject = subject;
    mailOptions.html = message;
    transporter.sendMail(mailOptions, (error, info) => {
        // console.log(error, info);
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
    sendMail: sendMail,
    copyProps: copyProps
}