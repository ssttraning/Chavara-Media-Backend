const express = require('express');
const db = require('../Database/db');
const router = express.Router();


router.post('/', (req, res) => {
    // console.log(req.body);
    const courseid = req.body.courseid;

    const sql = `select * from tbl_studentcourse c inner join tbl_registration s on c.registration_id=s.registration_id where c.course_id='${courseid}'`;

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