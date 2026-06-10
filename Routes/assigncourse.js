const express = require('express');
const db = require('../Database/db');
const router = express.Router();


router.post('/', (req, res) => {
    // console.log(req.body);

    const { tutor_id, course_ids } = req.body;
    // console.log('type',type);

    const sql1 = `delete from tbl_tutor_course where tutor_id='${tutor_id}'`
    db.query(sql1, (err, result2) => {
        if (err)
            console.log(err);
        else {
            course_ids.forEach((course_id) => {
                const sql = "insert into tbl_tutor_course(tutor_id,course_id) VALUES(?,?)";
                db.query(sql, [tutor_id, course_id], (err, result) => {
                    if (err) {
                        console.log(err)
                        // return res.status(500).send("Failed to insert type");
                    }
                })
            });
            const sqlquery = `update tbl_tutor set tutor_status='Assigned' where tutor_id='${tutor_id}'`
            db.query(sqlquery, (err, result1) => {
                if (err)
                    console.log(err);
                else {
                    res.status(200).send({
                        message: 'Courses assigned successfully'
                    });
                }
            })
        }
    });
})

module.exports = router;