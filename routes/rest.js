var express = require('express');
var router = express.Router();
var events = require('events');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express Rest' });
  next();
});


router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
    	  res.json(docs);
        });
    });

router.get('/user/:username', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({'username':req.params.username},{},function(e,docs){
    	  res.json(docs);
        });
    });

/* POST to Add User Service */
router.post('/user', function(req, res) {

    // Set our internal DB variable
    var db = req.db;
    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert(req.body, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.json({status : 1 , message : "There was a problem adding the information to the database."});
        } else {
            res.json({status : 0 ,message : "User Created"});
        }
    });
});


module.exports = router;