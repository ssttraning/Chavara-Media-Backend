const express = require('express');
const db = require('../Database/db');
const router = express.Router();


router.post('/', (req, res) => {
    // console.log(req.body);

    const modeid = req.body.modeid;
    // console.log('category',category);

    const sqlquery = `select * from tbl_mode where mode_id='${modeid}'`
    db.query(sqlquery, (err, sqlresult) => {
        if (err)
            console.log(err);
        else
        {
             res.send(sqlresult)
        }
    })
})

module.exports = router;