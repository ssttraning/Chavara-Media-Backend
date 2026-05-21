const express = require('express');
const db = require('../Database/db');
const router = express.Router();


router.post('/', (req, res) => {
    // console.log(req.body);

    const mode = req.body.mode;
    const category = req.body.category;
    const type = req.body.type;
    const title = req.body.title;
    const description = req.body.description;
    const duration = req.body.duration;
    const amount = req.body.amount;
    const hours = req.body.hours;
    const startdate = req.body.startdate;
    const enddate = req.body.enddate;
    const lastdate = req.body.lastdate;
    const status ='Active';

    const sqlquery = `select * from tbl_course where course_title='${title}' and course_duration='${duration}' and course_mode_id='${mode}'`
    db.query(sqlquery, (err, sqlresult) => {
        if (err)
            console.log(err);
        if (sqlresult.length > 0) {
            return res.send({ message: "already exists" })
        }
        else {
            const sql = "insert into tbl_course(course_title,course_description,course_mode_id,course_category_id,course_type_id,course_duration,course_startdate,course_enddate,course_hours,course_amount,course_status,course_lastdate) values(?,?,?,?,?,?,?,?,?,?,?,?)";
            db.query(sql, [title,description,mode,category,type,duration,startdate,enddate,hours,amount,status,lastdate], (err, result) => {
                if (err) {
                    console.log(err)
                    return res.status(500).send("Failed to insert course");
                }
                else {
                    res.send('Course inserted')
                }
            })
        }
    })
})

module.exports = router;