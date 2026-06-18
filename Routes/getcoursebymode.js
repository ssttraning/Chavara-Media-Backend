const express = require('express');
const db = require('../Database/db');
const router = express.Router();


router.post('/', (req, res) => {
    // console.log(req.body);
 
    const mode = req.body.mode;
   const date = new Date().toISOString().split('T')[0];

    const sql = `select * from tbl_course where course_mode_id='${mode}' and course_lastdate >='${date}'`;

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