const express = require('express');
const db = require('../Database/db');
const router = express.Router();


router.post('/', (req, res) => {
    // console.log(req.body);

    const courseid = req.body.courseid;
    // console.log('course',course);

    const sqlquery = `select * from tbl_course c inner join tbl_mode m on c.course_mode_id=m.mode_id 
    inner join tbl_type t on c.course_type_id=t.type_id
    inner join tbl_category ca on c.course_category_id=ca.category_id where c.course_id='${courseid}'`
    db.query(sqlquery, (err, sqlresult) => {
        if (err)
            console.log(err);
        else
        {
             res.send(sqlresult)
        }
    })
})

module.exports = router;