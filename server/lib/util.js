var fs = require('graceful-fs');
var randomAccessFile = require('random-access-file');
var global = require('../global/config');

module.exports = {
    SERVER_URL: global.server_url,
    responseHandler: (res, success, message, data) => {
        res.send({
            success: success,
            message: message,
            data: data
        });
    }
}