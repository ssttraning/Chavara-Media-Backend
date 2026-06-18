const express = require('express');
const db = require('../Database/db');
const router = express.Router();


router.post('/', (req, res) => {
    // console.log(req.body);

    const courseid = req.body.courseid;
    const amount = req.body.amount;
    const mode = req.body.mode;
    const description = req.body.description;
    const date = new Date().toISOString().split("T")[0];
    console.log('mode', mode);

    const sql = "insert into tbl_payment(student_course_id,paidamount,paiddate,mode_of_payment,payment_description) values(?,?,?,?,?)";
    db.query(sql, [courseid,amount,date,mode,description], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).send("Failed to insert payment");
        }
        else {
            return res.send({ message: 'payment successfull' })
        }
    })

})

module.exports = router;