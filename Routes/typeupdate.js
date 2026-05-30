const express = require('express');
const db = require('../Database/db');
const router = express.Router();


router.post('/', (req, res) => {
    // console.log(req.body);

    const type = req.body.type_name;
    const typeid = req.body.type_id;

    const sql = `update tbl_type set type_name='${type}' where type_id='${typeid}'`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).send("Failed to insert type");
        }
        else {
            return res.send({message:'type updated'})
        }
    })
})

module.exports = router;