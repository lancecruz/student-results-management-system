const express = require('express');
const router = express.Router();
const { query } = require('../db/index');

router.get('/', async (req, res, next) => {
    res.send("Test");
});

module.exports = router;