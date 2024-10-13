require('dotenv').config();
var db = require('../db/index');
var express = require('express');
var router = express.Router();
let { query } = require('../db/index');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

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

router.post('/admin', (req, res, next) => {
    
});

router.post('/teacher', async (req, res, next) => {
    try {
        const teacherCode = req.body.teacherCode;
        const password = req.body.password;

        let account = await query('SELECT * FROM teachers WHERE teacher_code = ($1)', [teacherCode]);

        if (account.rows.length == 0) {
            return res.sendStatus(404);
        }

        const userPassword = account.rows[0].password;
        if (await bcrypt.compare(password, userPassword)) {
            let user = {
                accountType: 'STUDENT',
                studentCode: account.rows[0].teacher_code
            };

            let accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
            res.json({accessToken: accessToken});               
        } else {
            res.send('Password invalid!');
        }
    } catch (error) {
        throw new Error(error.message);
    }
    
    //res.send('Teacher Login');
});

router.post('/student', async (req, res, next) => {
    try {
        const studentCode = req.body.studentCode;
        const password = req.body.password;

        let account = await query('SELECT * FROM students WHERE student_code = ($1)', [studentCode]);

        if (account.rows.length == 0) {
            return res.sendStatus(404);
        }

        const userPassword = account.rows[0].password;
        if (await bcrypt.compare(password, userPassword)) {
            let user = {
                accountType: 'STUDENT',
                studentCode: account.rows[0].student_code
            };

            let accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
            res.json({accessToken: accessToken});               
        } else {
            res.status(403).send('Password invalid!');
        }
    } catch (error) {
        throw new Error(error.message);
    }
});

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        req.user = user;
        next();
    });
};

module.exports = router;