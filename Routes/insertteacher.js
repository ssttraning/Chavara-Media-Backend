const express = require('express');
const db = require('../Database/db');
const router = express.Router();

router.post('/', (req, res) => {

    const name = req.body.teacher_name;
    const email = req.body.email;
    const phone = req.body.phone;
    const gender = req.body.gender;
    const photo = req.body.photo;
    const experience = req.body.experience;
    const qualification = req.body.qualification;
    const certificate = req.body.certificate;
    const resume = req.body.resume;
    const password = "Null";
    const reg_date = new Date().toISOString().split("T")[0];
    const status="Register";

    const sqlquery = `select * from tbl_tutor where tutor_email='${email}'`;

    db.query(sqlquery, (err, sqlres) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Database Error");
        }

        if (sqlres.length > 0) {
            return res.send({ message: 'Already exists' });
        }

        const sql = `insert into tbl_tutor(tutor_name,tutor_email,tutor_contact,tutor_image,tutor_gender,qualification,experience,certificate,reg_date,tutor_password,tutor_status,resume)values(?,?,?,?,?,?,?,?,?,?,?,?)`;


        db.query(sql, [name,email,phone,photo,gender,qualification,experience,certificate,reg_date,password,status,resume], (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).send("Failed to insert tutor");
            }
            else {
                return res.send({ message: 'tutor inserted' })
            }
        })
    }
    );

});
;

module.exports = router;