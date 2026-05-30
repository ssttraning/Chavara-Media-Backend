const express = require('express');
const db = require('../Database/db');
const router = express.Router();


router.post('/', (req, res) => {
    // console.log(req.body);

    const categoryid = req.body.categoryid;
    // console.log('category',category);

    const sqlquery = `select * from tbl_category where category_id='${categoryid}'`
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