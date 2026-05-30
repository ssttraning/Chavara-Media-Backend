const express = require('express');
const db = require('../Database/db');
const router = express.Router();


router.post('/', (req, res) => {
    // console.log(req.body);

    const category = req.body.category_name;
    const categoryid = req.body.category_id;
    // console.log('category',category);

    const sql = `update tbl_category set category_name='${category}' where category_id='${categoryid}'`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).send("Failed to insert category");
        }
        else {
            return res.send({message:'category updated'})
        }
    })
})

module.exports = router;