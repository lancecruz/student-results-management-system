var express = require('express');
var router = express.Router();
let { query } = require('../db/index');

const SELECT_ALL_QUERY = 'SELECT * FROM classes';
const SELECT_CLASSES_COUNT = 'SELECT COUNT(*) FROM classes INNER JOIN class_schedule ON class_schedule.class_id = classes.id INNER JOIN teachers ON class_schedule.teacher_code = teachers.teacher_code';

let ALL_BOOKS = [
    {
      id: 12345,
      title: 'JavaScript For Dummies',
      start: new Date(2021, 10, 1).toISOString(),
      end: new Date(2021, 10, 5).toISOString(),
    }
];

router.get('/', async (req, res, next) => {
    const { page, offset, limit, sortBy } = req.query;
    console.log("Sort: " + sortBy);
    const SELECT_ALL_FROM_CLASSES_QUERY = `SELECT classes.id, classes.class_code, classes.class_name, class_schedule.class_schedule_id, class_schedule.class_time, class_schedule.class_day, teachers.teacher_code, teachers.first_name, teachers.last_name FROM classes INNER JOIN class_schedule ON class_schedule.class_id = classes.id INNER JOIN teachers ON class_schedule.teacher_code = teachers.teacher_code ORDER BY ${sortBy} ASC LIMIT ${limit} OFFSET ${offset}`;
    //res.send('respond with a resource');
    
    const classesData = await query(SELECT_ALL_FROM_CLASSES_QUERY);
    const classesCount = await query(SELECT_CLASSES_COUNT); 

    let responseData = {
        classes: classesData.rows,
        count: classesCount.rows[0].count
    };

    res.json(responseData);
}); 

router.get('/:id', async (req, res, next) => {
    try {
        const classScheduleID = req.params.id;
        console.log(classScheduleID);
        const GET_BY_CLASS_ID_QUERY = `SELECT classes.id, classes.class_code, classes.class_name, class_schedule.class_schedule_id, class_schedule.class_time, class_schedule.class_day, teachers.teacher_code, teachers.first_name, teachers.last_name FROM classes INNER JOIN class_schedule ON class_schedule.class_id = classes.id INNER JOIN teachers ON class_schedule.teacher_code = teachers.teacher_code WHERE class_schedule.class_schedule_id = ${classScheduleID} ORDER BY class_code ASC`;

        const results = await query(GET_BY_CLASS_ID_QUERY);
        //res.send(`ID: ${classID}`);
        console.log(results.rows);
        res.status(200).json(results.rows[0]);
    } catch (error) {
        throw new Error(error.message);
    }
});

router.get('/teacher/:code', async (req, res, next) => {
    const { page, offset, limit, sortBy } = req.query;
    const teacherCode = req.params.code.toString();
    const GET_CLASSES_BY_TEACHER_CODE = `SELECT classes.class_name, classes.class_code, class_schedule.class_day, class_schedule.class_time FROM class_schedule INNER JOIN classes ON classes.id = class_schedule.class_id WHERE class_schedule.teacher_code = $1 ORDER BY ${sortBy} ASC LIMIT ${limit} OFFSET ${offset};`;
    const CLASSES_BY_TEACHER_CODE_COUNT = `SELECT COUNT(*) FROM classes INNER JOIN class_schedule ON class_schedule.class_id = classes.id INNER JOIN teachers ON class_schedule.teacher_code = teachers.teacher_code WHERE class_schedule.teacher_code = $1`;

    try {
        const result = await query(GET_CLASSES_BY_TEACHER_CODE, [teacherCode]);
        const countResult = await query(CLASSES_BY_TEACHER_CODE_COUNT, [teacherCode]);

        let responseData = {
            classes: result.rows,
            count: countResult.rows[0].count
        };

        res.status(200).json(responseData);
    } catch (error) {
        throw new Error(error.message);
    }

    //res.send('Teacher Code: ' + teacherCode);
});

router.post('/', async (req, res) => {
    let currentDate = new Date();

    try {
        const newClass = await query('INSERT INTO classes (class_code, class_name, createdat, updatedat) VALUES ($1, $2, $3, $4) RETURNING id', [req.body.classCode, req.body.className, currentDate, currentDate]);
        
        if (newClass.rowCount > 0) {
            let newClassId = newClass.rows[0].id;
            if (req.body.scheduleList.length > 1) {
                req.body.scheduleList.forEach(async (item) => {
                    const newClassSchedule = await query('INSERT INTO class_schedule (class_id, class_time, class_day, teacher_code, createdat, updatedat) VALUES ($1, $2, $3, $4, $5, $6)', 
                        [newClassId, item.time, item.day, req.body.teacherCode, new Date(), new Date()]);
                });
            } else {
                const newClassSchedule = await query('INSERT INTO class_schedule (class_id, class_time, class_day, teacher_code, createdat, updatedat) VALUES ($1, $2, $3, $4, $5, $6)', 
                    [newClassId, req.body.scheduleList[0].time, req.body.scheduleList[0].day, req.body.teacherCode, new Date(), new Date()]);
            }
        }

        return res.status(201).send(`Class added. ${newClass.rows[0].id}`);
    } catch (error) {
        throw new Error(error.message);
    }
});

router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const UPDATE_CLASS_SCHEDULE_BY_ID_QUERY = `UPDATE class_schedule SET teacher_code = $1, class_time = $2, class_day = $3, updatedat = CURRENT_TIMESTAMP WHERE class_schedule_id = ${id} RETURNING class_schedule_id;`;

    try {
        const results = await query(UPDATE_CLASS_SCHEDULE_BY_ID_QUERY, [req.body.teacher_code, req.body.class_time, req.body.class_day]);
        res.status(200).json(results.rows[0].class_schedule_id);
    } catch (error) {
        throw new Error(error.message);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const classId = req.params.id;
        const DELETE_BY_ID_QUERY = `WITH deleted_table1 AS (DELETE FROM class_schedule WHERE class_id = ${classId} RETURNING *), deleted_table2 AS (DELETE FROM classes WHERE id = ${classId} RETURNING *) SELECT * FROM deleted_table1, deleted_table2;`;

        if (isNaN(classId) == true) {
            throw new Error("Please input a number.");
        }

        const queryData = await query(DELETE_BY_ID_QUERY);

        let responseData = {
            deletedData: queryData.rows
        }

        console.log(req.params.id);
        res.status(200).json(responseData);
    } catch (error) {
        throw new Error(error.message);
    }
});

module.exports = router;