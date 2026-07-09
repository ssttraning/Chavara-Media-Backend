const express = require('express');
const db = require('../Database/db');
const router = express.Router();


router.post('/', (req, res) => {
    // console.log(req.body);
 
    const mode = req.body.mode;
   const date = new Date().toISOString().split('T')[0];

    const sql = `select * from tbl_course c inner join tbl_tutor_course tc on tc.course_id=c.course_id 
    inner join tbl_tutor tu on tc.tutor_id=tu.tutor_id where c.course_mode_id='${mode}' and c.course_lastdate >='${date}'`;

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