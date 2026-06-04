const express = require('express');
const db = require('../Database/db');
const router = express.Router();

router.post('/', (req, res) => {

    const name = req.body.reg_name;
    const email = req.body.reg_email;
    const contact = req.body.reg_contact;
    const state = req.body.state;
    const district = req.body.district;
    const address = req.body.address;
    const DOB = req.body.dob;
    const gender = req.body.gender;
    const photo = req.body.photo;
    const password = req.body.password;
    const year = new Date().getFullYear().toString().slice(-2); // 26

    const sqlquery = `select * from tbl_registration where registration_email='${email}'`;

    db.query(sqlquery, (err, sqlres) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Database Error");
        }

        if (sqlres.length > 0) {
            return res.send({ message: 'Already exists' });
        }
        else {

            const sql1 = `SELECT registration_number AS regno FROM tbl_registration ORDER BY registration_id DESC LIMIT 1`;

            db.query(sql1, (err, result1) => {

                if (err) {
                    console.log(err);
                    return res.status(500).send("Database Error");
                }
                else {
// console.log(result1);

                    let registration_number = `C${year}_001`;

                   if (result1.length > 0 && result1[0].regno) {

                        // Example: C26_005
                        const lastRegNo = result1[0].regno;

                        // Extract numeric part after _
                        const lastNumber = parseInt(lastRegNo.split('_')[1]);

                        // Increment and pad with zeros
                        const nextNumber = String(lastNumber + 1).padStart(3, '0');

                        registration_number = `C${year}_${nextNumber}`;
                    }

                    const sql = `insert into tbl_registration(registration_number,registration_name,registration_email, registration_contact,registration_state,registration_district,address,DOB,gender,photo,password)values(?,?,?,?,?,?,?,?,?,?,?)`;

                    db.query(
                        sql,
                        [registration_number, name, email, contact, state, district, address, DOB, gender, photo, password],
                        (err, result) => {

                            console.log(sql, [registration_number, name, email, contact, state, district, address, DOB, gender, photo, password]);

                            if (err) {
                                console.log(err);
                                return res.status(500).send("Failed to insert student");
                            }
                            else {
                                return res.send({ message: 'student inserted' });
                            }
                        }
                    );
                }
            });
        }
    });
});

module.exports = router;