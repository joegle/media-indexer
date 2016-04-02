var express = require('express');
var router = express.Router();
var db = require("../draftsBlob");


router.get('/', function(req, res, next) {
    var i = parseInt((Math.random()*100)%600);
    var draft = db[i]
    res.json(draft);
    res.end();

});

module.exports = router;
