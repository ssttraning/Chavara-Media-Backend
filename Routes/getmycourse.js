const express = require('express');
const db = require('../Database/db');
const router = express.Router();


router.post('/', (req, res) => {
    // console.log(req.body);
    const studentid = req.body.studentid;

    const sql = `select * from tbl_studentcourse s inner join tbl_course c on s.course_id=c.course_id inner join tbl_tutor_course tc on tc.course_id=c.course_id 
    inner join tbl_tutor tu on tc.tutor_id=tu.tutor_id where s.registration_id='${studentid}' and s.course_status='Admit'`;

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})

module.exports = router;