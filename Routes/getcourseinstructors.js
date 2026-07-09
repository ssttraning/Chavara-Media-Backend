const express = require('express');
const db = require('../Database/db');
const router = express.Router();


router.post('/', (req, res) => {
    // console.log(req.body);
 
    const courseid = req.body.courseid;

    const sql = `SELECT * from tbl_tutor_course c inner join tbl_tutor t on c.tutor_id=t.tutor_id WHERE c.course_id='${courseid}'`;

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