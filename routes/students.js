const express = require('express');
const router = express.Router();
const { query } = require('../db/index');

router.get('/', async (req, res, next) => {
    try {
        const GET_ALL_STUDENTS_QUERY = `SELECT * FROM students`;
        const studentsData = await query(GET_ALL_STUDENTS_QUERY);
        res.json(studentsData);
    } catch (error) {
        throw new Error(error.message);
    }

    res.send("Test");
});

module.exports = router;