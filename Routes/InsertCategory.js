const express = require('express');
const db = require('../Database/db');
const router = express.Router();


router.post('/', (req, res) => {
    // console.log(req.body);

    const category = req.body.Category;
    // console.log('category',category);

    const sqlquery = `select * from tbl_category where category_name='${category}'`
    db.query(sqlquery, (err, sqlresult) => {
        if (err)
            console.log(err);
        if (sqlresult.length > 0) {
            return res.send({ message: "already exists" })
        }
        else {
            const sql = "insert into tbl_category(category_name) values(?)";
            db.query(sql, [category], (err, result) => {
                if (err) {
                    console.log(err)
                    return res.status(500).send("Failed to insert category");
                }
                else {
                    res.send('category inserted')
                }
            })
        }
    })
})

module.exports = router;