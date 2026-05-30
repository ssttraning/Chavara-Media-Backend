const express = require('express');
const db = require('../Database/db');
const router = express.Router();


router.post('/', (req, res) => {
    // console.log(req.body);

    const mode = req.body.mode_type;
    const modeid = req.body.mode_id;
    // console.log('mode',mode);

    const sql = `update tbl_mode set mode_type='${mode}' where mode_id='${modeid}'`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).send("Failed to insert mode");
        }
        else {
            return res.send({message:'mode updated'})
        }
    })
})

module.exports = router;