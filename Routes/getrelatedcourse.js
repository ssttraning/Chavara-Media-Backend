const express = require('express');
const db = require('../Database/db');
const router = express.Router();


router.post('/', (req, res) => {
    // console.log(req.body);

    const courseid = req.body.courseid;
    // console.log('category',category);
   const date = new Date().toISOString().split('T')[0];

    const sql = `select * from tbl_course where course_id='${courseid}'`;
    db.query(sql, (err, result) => {
        if (err)
            console.log(err);
        else {
            let categoryid = result[0].course_category_id;
            const sqlquery = `select * from tbl_course where course_category_id='${categoryid}' and course_id!='${courseid}' and course_lastdate>='${date}'`
            db.query(sqlquery, (err, sqlresult) => {
                if (err)
                    console.log(err);
                else {
                    res.send(sqlresult)
                }
            })
        }
    })
})

module.exports = router;