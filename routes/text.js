var express = require('express');
var router = express.Router();
var db = require("../redisConnection");


router.get('/', function(req, res, next) {
    res.json("lol");
    res.end();
});

router.post('/', function(req, res, next){
    console.log(req.body);
    db.lpush("log",req.body.message);
    res.json("ok")
    res.end();
});
module.exports = router;
