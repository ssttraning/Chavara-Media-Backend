const express = require('express');
const db = require('../Database/db');
const router = express.Router();


router.post('/', (req, res) => {
    // console.log(req.body);
    const tutorid = req.body.tutorid;
   const date = new Date().toISOString().split('T')[0];

    const sql = `select * from tbl_tutor_course t inner join tbl_course c on t.course_id=c.course_id inner join tbl_mode m on c.course_mode_id=m.mode_id where t.tutor_id='${tutorid}' and c.course_enddate >='${date}'`;
//    console.log(sql)
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