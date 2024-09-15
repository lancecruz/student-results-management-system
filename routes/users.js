var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log("Test Back ENd");
    res.send('respond with a resource');
});

module.exports = router;
