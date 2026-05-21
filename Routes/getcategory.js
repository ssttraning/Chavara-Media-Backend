const express = require('express');
const db = require('../Database/db');
const router = express.Router();


router.get('/', (req, res) => {
    // console.log(req.body);

    const sql = "select * from tbl_category";
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