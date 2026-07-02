const express = require('express');
const db = require('../Database/db');
const router = express.Router();


router.get('/', (req, res) => {
    // console.log(req.body);
   const date = new Date().toISOString().split('T')[0];
    const sql = `SELECT * FROM tbl_course WHERE course_lastdate >='${date}'`;
console.log(sql);

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