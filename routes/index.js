var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/dc',function(req, res, next){
    res.render('notes', {title: 'dc'});
});

router.get('/nv', function(req, res, next){
    res.render('nv',{title: 'nv'});
});

module.exports = router;
