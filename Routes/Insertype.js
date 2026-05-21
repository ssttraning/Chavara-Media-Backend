const express = require('express');
const db = require('../Database/db');
const router = express.Router();


router.post('/', (req, res) => {
    // console.log(req.body);

    const type = req.body.Type;
    // console.log('type',type);

    const sqlquery = `select * from tbl_type where type_name='${type}'`;
    db.query(sqlquery, (err, sqlresult) => {
        if (err) {
            console.log(err);
        }
        if (sqlresult.length > 0) {
            return res.send({ message: "already exits" })
        }
        else {
            const sql = "insert into tbl_type(type_name) values(?)";
            db.query(sql, [type], (err, result) => {
                if (err) {
                    console.log(err)
                    return res.status(500).send("Failed to insert type");
                }
                else {
                    res.send('type inserted')
                }
            })
        }
    })
})

module.exports = router;