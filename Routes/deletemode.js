const express = require('express');
const db = require('../Database/db');
const router = express.Router();


router.post('/', (req, res) => {
    // console.log(req.body);
   const modeid= req.body.modeid;
    const sql = `delete from tbl_mode where mode_id='${modeid}'`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
           return res.send({message:"deleted successfully"})
        }
    })
})

module.exports = router;