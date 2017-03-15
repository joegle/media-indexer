var express = require('express');
var router = express.Router();
var db = require("../redisConnection");


router.get('/', function(req, res, next) {
    var folder = req.query.mount;
    db.spop("mount:"+ folder , function(err,value){
	res.json({ filename: '/images/'+value });
	res.end();
    });

});

module.exports = router;
