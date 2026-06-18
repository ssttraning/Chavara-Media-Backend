const express = require('express');
const db = require('../Database/db');
const router = express.Router();


router.get('/', (req, res) => {
    // console.log(req.body);

    const sql = `select * from tbl_registration r inner join tbl_studentcourse s on r.registration_id=s.registration_id
    inner join tbl_course c on s.course_id=c.course_id where s.course_status='Active'`;
    // console.log(sql);
    
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