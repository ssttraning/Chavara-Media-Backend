const express = require('express');
const db = require('../Database/db');
const router = express.Router();


router.post('/', (req, res) => {
    // console.log(req.body);

    const studentid = req.body.studentid;
    // console.log('mode',mode);

    const sql = `SELECT
    c.course_title,
    c.course_amount,
    MAX(p.paiddate) AS last_paid_date,
    COALESCE(SUM(p.paidamount),0) AS total_paid,
    c.course_amount - COALESCE(SUM(p.paidamount),0) AS balance_amount
FROM tbl_studentcourse s
INNER JOIN tbl_course c
    ON s.course_id = c.course_id
LEFT JOIN tbl_payment p
    ON p.student_course_id = s.student_courseid
WHERE s.registration_id = '${studentid}' and s.course_status='Admit'
GROUP BY c.course_id;`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).send("Failed to update");
        }
        else {
            res.send(result)
        }
    })
})

module.exports = router;