var express = require('express');
var router = express.Router();
var execFile = require('child_process').execFile;
var execFileSync = require('child_process').execFileSync;
var db = require("../redisConnection");
var async = require('async');
var fs = require('fs');

router.get('/', function(req, res, next) {
    var sess = req.session;

    var mounts = fs.readdirSync("mounts/");
    res.json({mounts: mounts });
    res.end();

});

router.get('/:mount', function(req, res, next) {
    var folder = req.params.mount;
    scanMount(folder, function(err, result){
	res.json({inserted: result, folder: folder});
	res.end();
    });
	
})


function scanMount( mount, callback ) {
    db.sadd('mounts', "mount:" + mount);
    // Todo : security check if mount is valid since this is any directory

    var count = 0;
    var mountPrefix = mount;
    var my_cwd = 'mounts/' + mount;

    execFile('find', [ "." , "-type", "f", "-name", "*" ], {cwd: my_cwd}, function(err, stdout, stderr) {
    	var file_list = stdout.split('\n');

	async.each(file_list, function(element, cb ){
	    db.sadd("mount:"+mount, mountPrefix + element.substring(1), function(err,res){
		count+=res;
		cb();
	    });
	},function(err){
	    callback(null, count);	    
	});
	
    });
}

router.get('/clear/:mount', function(req, res, next) {
    // todo list options with empty param
    db.del("mount:"+req.params.mount );
    res.setHeader('Content-Type', 'text/html');
    res.write('<p> clear files</p>');
    res.end();

});

module.exports = router;

