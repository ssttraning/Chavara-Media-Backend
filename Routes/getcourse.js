const express = require('express');
const db = require('../Database/db');
const router = express.Router();


router.get('/', (req, res) => {
    // console.log(req.body);

    const sql = "select * from tbl_course c inner join tbl_mode m on c.course_mode_id=m.mode_id inner join tbl_type t on c.course_type_id=t.type_id";

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