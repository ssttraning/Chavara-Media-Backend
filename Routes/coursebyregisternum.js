const express = require('express');
const db = require('../Database/db');
const router = express.Router();


router.post('/', (req, res) => {
    // console.log(req.body);
    const registernum = req.body.registernum;
    const sql = `select * from tbl_registration where registration_number='${registernum}'`;
    console.log(sql);

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            const studentid = result[0].registration_id;
            const sql1 = `SELECT
    s.student_courseid,
    c.course_title,
    c.course_amount,

    COALESCE(SUM(p.paidamount),0) AS paid_amount,

    (c.course_amount - COALESCE(SUM(p.paidamount),0)) AS balance_amount,

    CASE
        WHEN COALESCE(SUM(p.paidamount),0) = 0 THEN 'Unpaid'
        WHEN COALESCE(SUM(p.paidamount),0) < c.course_amount THEN 'Partial'
        ELSE 'Paid'
    END AS payment_status

FROM tbl_studentcourse s

INNER JOIN tbl_course c
    ON s.course_id = c.course_id

LEFT JOIN tbl_payment p
    ON s.student_courseid = p.student_course_id

WHERE s.registration_id = '${studentid}'

GROUP BY
    s.student_courseid,
    c.course_title,
    c.course_amount;`;
            db.query(sql1, (err, result1) => {
                if (err)
                    console.log(err);
                else {
                    res.send(result1)
                }
            })
        }
    })
})

module.exports = router;