const express = require('express');
const db = require('../Database/db');
const router = express.Router();


router.post('/', (req, res) => {
    // console.log(req.body);
    const name=req.body.reg_name
    const email = req.body.reg_email;
    console.log('email', email);

    const sqlquery = `select * from tbl_registration where registration_email='${email}'`;
    db.query(sqlquery, (err, sqlres) => {
        if (err) {
            console.log(err);
        }
        if (sqlres.length>0) {
           return res.send({message:'mode already exists'})
        }
        else {
            const sql = "insert into tbl_registration(registration_number,registration_name,registration_email,registration_contact,registration_state,registration_district,address,DOB,gender,photo,password) values(?,?,?,?,?,?,?,?,?,?,?)";
            db.query(sql, [email], (err, result) => {
                if (err) {
                    console.log(err)
                    return res.status(500).send("Failed to insert student");
                }
                else {
                  return res.send({message:'student inserted'})
                }
            })
        }
    })
})

module.exports = router;