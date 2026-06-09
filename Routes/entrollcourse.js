const express = require('express');
const db = require('../Database/db');
const router = express.Router();


router.post('/', (req, res) => {
    // console.log(req.body);

    const courseid = req.body.courseid;
    const studentid = req.body.studentid;
    const coursestatus = 'Active'
    const paymentstatus = 'not paid'
    const date = new Date().toISOString().split("T")[0];
    console.log('mode', studentid);

    const sqlquery = `select * from tbl_studentcourse where registration_id='${studentid}' and course_id='${courseid}'`;
    db.query(sqlquery, (err, sqlres) => {
        if (err) {
            console.log(err);
        }
        if (sqlres.length>0) {
           return res.send({message:'course already registered'})
        }
        else {
            const sql = "insert into tbl_studentcourse(registration_id,course_id,course_status,payment_status,entroll_date) values(?,?,?,?,?)";
            db.query(sql, [studentid,courseid,coursestatus,paymentstatus,date], (err, result) => {
                if (err) {
                    console.log(err)
                    return res.status(500).send("Failed to insert mode");
                }
                else {
                  return res.send({message:'mode inserted'})
                }
            })
        }
    })
})

module.exports = router;