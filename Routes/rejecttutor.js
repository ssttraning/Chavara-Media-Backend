const express = require('express');
const db = require('../Database/db');
const router = express.Router();


router.post('/', (req, res) => {
    // console.log(req.body);

    const tutorid = req.body.tutorid;
    // console.log('mode',mode);

    const sql = `update tbl_tutor set tutor_status='Rejected' where tutor_id='${tutorid}'`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).send("Failed to update");
        }
        else {
            return res.send({message:'rejected'})
        }
    })
})

module.exports = router;