var db = require('../db/index');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    db.query('SELECT * FROM users', '', (error, results) => {
        res.status(200).json(results.rows);
    });
    
    // res.render('index', { title: 'Express' });
});

module.exports = router;