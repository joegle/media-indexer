var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/dc',function(req, res, next){
    res.render('notes', {title: 'dc'});
});

module.exports = router;
