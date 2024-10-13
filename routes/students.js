const express = require('express');
const router = express.Router();
const { query } = require('../db/index');
const bcrypt = require('bcrypt');

const INSERT_INTO_STUDENTS_QUERY = 'INSERT INTO students (first_name, last_name, email, password, student_code, created, updated, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id';
const SELECT_LATEST_STUDENT_CODE_QUERY = 'SELECT student_code FROM students ORDER BY student_code DESC LIMIT 1;';
const defaultStudentCode = 'ST10000';

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

router.post('/', async (req, res, next) => {
    const currentDate = new Date();

    try {
        const { firstName, lastName, email} = req.body;
        const studentCode = await generateStudentCode();
        const password = await generateStudentDefaultPassword(studentCode);
        const response = await query(INSERT_INTO_STUDENTS_QUERY, [firstName, lastName, email, password, studentCode, currentDate, currentDate, 'active']);

        if (response.ok) {
            const responseData = await response.json();
            res.status(200).json(responseData);
        }
    } catch (error) {
        throw new Error(error.message);
    }
});

const generateStudentCode = async () => {
    const latestStudentCode = await query(SELECT_LATEST_STUDENT_CODE_QUERY);

    if (latestStudentCode.rows.length > 0) {
        const newStudentCode = 'ST' + (parseInt(latestStudentCode.rows[0].student_code.substring(2)) + 1);
        return newStudentCode;
    } else {
        return defaultStudentCode;
    }
};

const generateStudentDefaultPassword = async (studentCode) => {
    const hashedPassword = await bcrypt.hash(studentCode, 10);
    console.log(hashedPassword);
    return hashedPassword;
};

module.exports = router;