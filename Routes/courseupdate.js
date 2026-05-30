const express = require('express');
const db = require('../Database/db');
const router = express.Router();


router.post('/', (req, res) => {
    // console.log(req.body);
    const courseid = req.body.course_id
    const title = req.body.course_title;
    const description = req.body.course_description;
    const duration = req.body.course_duration;
    const amount = req.body.course_amount;
    const hours = req.body.course_hours;
    const startdate = new Date(req.body.course_startdate).toISOString().split('T')[0];
    const enddate = new Date(req.body.course_enddate).toISOString().split('T')[0];
    const lastdate = new Date(req.body.course_lastdate).toISOString().split('T')[0];

    const sql = `update tbl_course set course_title='${title}',course_description='${description}',course_duration='${duration}',course_startdate='${startdate}',course_enddate='${enddate}',course_hours='${hours}',course_amount='${amount}',course_lastdate='${lastdate}' where course_id='${courseid}'`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).send("Failed to update course");
        }
        else {
            return res.send({ message: 'course updated' })
        }
    })
})

module.exports = router;