const express = require('express');
const db = require('../Database/db');
const router = express.Router();


router.post('/', (req, res) => {
    // console.log(req.body);

    const typeid = req.body.typeid;
    // console.log('category',category);

    const sqlquery = `select * from tbl_type where type_id='${typeid}'`
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