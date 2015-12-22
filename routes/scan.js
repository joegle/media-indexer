var express = require('express');
var router = express.Router();
var db = require("../redisConnection");

/* GET users listing. */
router.get('/', function(req, res, next) {
    var sess = req.session
    var folder = '/Users/joe/Pictures/Photos\ Library.photoslibrary/Masters/';
    var execFile = require('child_process').execFile;
    execFile('find', [ "." , "-type", "f" ], {cwd:folder}, function(err, stdout, stderr) {
	var file_list = stdout.split('\n');
	console.log(file_list);
	var count=0;
	file_list.forEach(function(element, index, array){
	    count = count +  db.sadd("images","/images/"+element.substring(1));

	});
	res.setHeader('Content-Type', 'text/html')
	res.write('<p> Inserted ' + count + ' files</p>')
	res.end()
	/* now you've got a list with full path file names */
    });

    
});

module.exports = router;
