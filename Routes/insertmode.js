const express = require('express');
const db = require('../Database/db');
const router = express.Router();


router.post('/', (req, res) => {
    // console.log(req.body);

    const mode = req.body.mode;
    console.log('mode', mode);

    const sqlquery = `select * from tbl_mode where mode_type='${mode}'`;
    db.query(sqlquery, (err, sqlres) => {
        if (err) {
            console.log(err);
        }
        if (sqlres.length>0) {
           return res.send({message:'mode already exists'})
        }
        else {
            const sql = "insert into tbl_mode(mode_type) values(?)";
            db.query(sql, [mode], (err, result) => {
                if (err) {
                    console.log(err)
                    return res.status(500).send("Failed to insert mode");
                }
                else {
                  return res.send('mode inserted')
                }
            })
        }
    })
})

module.exports = router;