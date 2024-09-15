const express = require('express');
const router = express.Router();
let { query } = require('../db/index');

router.get('/', async (req, res, next) => {
    console.log("Teachers Get");
    const data = await query('SELECT * FROM teachers');
    console.log(data.rows);
    res.json(data.rows);
});

module.exports = router;