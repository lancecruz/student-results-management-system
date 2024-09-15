var db = require('../db/index');
var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    const { name, password } = req.body;
    const loginUserQuery = 'SELECT * FROM users WHERE name = $1';

    db.query(loginUserQuery, [name], (error, results) => {
        if (error) {
            throw error;
        }
        
        console.log(results.rows);

        res.status(200).json(results.rows);
    });
});

router.get('/admin', (req, res, next) => {
    
});

module.exports = router;