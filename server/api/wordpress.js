var express = require('express');
var router = express.Router();
var fs = require('graceful-fs');
var Util = require('../lib/util');
var WPAPI = require('wpapi');
var CONFIG = require('../global/config');

var wp = new WPAPI({ endpoint: CONFIG.blog_endpoint });

router.get('/get-tips', (req, res) => {
    wp.categories().slug('tips')
        .then(function (cats) {
            // .slug() queries will always return as an array
            var fictionCat = cats[0];
            console.log(fictionCat);
            wp.posts().categories( fictionCat.id )
                .then((posts) => Util.responseHandler(res, true, '', posts));
        })
})

router.get('/get-blogs', (req, res) => {
    wp.categories().slug('blogs')
        .then(function (cats) {
            // .slug() queries will always return as an array
            var fictionCat = cats[0];
            console.log(fictionCat);
            wp.posts().categories( fictionCat.id )
                .then((posts) => Util.responseHandler(res, true, '', posts));
        })
})

module.exports = router;