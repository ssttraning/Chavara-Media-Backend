const express = require('express');
const db = require('../Database/db');
const router = express.Router();


router.post('/', (req, res) => {
    // console.log(req.body);

    const email = req.body.username;
    const password = req.body.password;

    const sql = `select * from tbl_registration where registration_email ='${email}' and password='${password}'`;
    //console.log(sql);

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            if (result.length > 0) {
                res.send(result)
            }
            else {
                const sql1 = `select * from tbl_tutor where tutor_email ='${email}' and tutor_password='${password}'`;

            }
        }
    })
})

module.exports = router;