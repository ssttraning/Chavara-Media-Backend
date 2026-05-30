const express = require('express');
const db = require('../Database/db');
const router = express.Router();


router.post('/', (req, res) => {
    // console.log(req.body);
    const courseid = req.body.courseid;
    const sql = `select * from tbl_course_material m inner join tbl_course c on m.course_id=c.course_id where m.course_id='${courseid}'`;
    console.log(sql);

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