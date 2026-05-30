const express = require('express');
const db = require('../Database/db');
const router = express.Router();


router.post('/', (req, res) => {

    const { courseid } = req.body

    const sql = `delete from tbl_course where course_id='${courseid}'`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)

            return res.status(400).send({
                message: "Database error",
                error: err
            })
        }
        else {
            console.log(result)

            return res.status(200).send({
                message: "deleted successfully"
            })

        }
    })
})

module.exports = router;