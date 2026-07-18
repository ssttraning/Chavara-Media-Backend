const express = require('express');
const db = require('../Database/db');
const router = express.Router();


router.post('/', (req, res) => {
    // console.log(req.body);
    const categoryid = req.body.categoryid;
    const date = new Date().toISOString().split('T')[0];

    const sql = `select * from tbl_course c inner join tbl_mode m on c.course_mode_id=m.mode_id 
    inner join tbl_type t on c.course_type_id=t.type_id
    where c.course_category_id='${categoryid}' and c.course_enddate <='${date}'`;
    // console.log(sql)
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