const express = require('express');
const db = require('../Database/db');
const router = express.Router();


router.post('/', (req, res) => {
    // console.log(req.body);

    const studentcourseid = req.body.studentcourseid;

    const sql = `update tbl_studentcourse set course_status='Admit' where student_courseid='${studentcourseid}'`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).send("Failed to admit");
        }
        else {
            return res.send({message:'Admitted'})
        }
    })
})

module.exports = router;